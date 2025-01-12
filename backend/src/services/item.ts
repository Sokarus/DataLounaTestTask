import redis from '@redis';
import {GetItems, Item} from '@models/skinport';
import {GetUserData} from '@models/user';
import {GetItem} from '@models/item';
import {Purchase} from '@models/purchase';

type MinPriceItem = {
  market_hash_name: string;
  tradable_price: number | null;
  not_tradable_price: number | null;
};

const getMinPrices = (tradableItems: Item[], notTradableItems: Item[]): MinPriceItem[] => {
  const priceMap: Record<string, MinPriceItem> = {};

  tradableItems.forEach((item) => {
    if (!priceMap[item.market_hash_name]) {
      priceMap[item.market_hash_name] = {
        market_hash_name: item.market_hash_name,
        tradable_price: item.min_price,
        not_tradable_price: null,
      };
    } else {
      priceMap[item.market_hash_name].tradable_price = Math.min(
        priceMap[item.market_hash_name].tradable_price ?? Infinity,
        item.min_price
      );
    }
  });

  notTradableItems.forEach((item) => {
    if (!priceMap[item.market_hash_name]) {
      priceMap[item.market_hash_name] = {
        market_hash_name: item.market_hash_name,
        tradable_price: null,
        not_tradable_price: item.min_price,
      };
    } else {
      priceMap[item.market_hash_name].not_tradable_price = Math.min(
        priceMap[item.market_hash_name].not_tradable_price ?? Infinity,
        item.min_price
      );
    }
  });

  return Object.values(priceMap);
};

export const DoGetItems = async (appId: number, currency: string) => {
  const cache = await redis.get('items');

  if (cache) {
    return JSON.parse(cache);
  }

  return Promise.all([GetItems(appId, currency, true), GetItems(appId, currency, false)]).then(
    async (values) => {
      const itemsMinPrices = getMinPrices(values[0], values[1]);

      await redis.set('items', JSON.stringify(itemsMinPrices), 'EX', 3600);

      return itemsMinPrices;
    }
  );
};

export const DoPurchaseProduct = async (userId: number, productId: number) => {
  return Promise.all([GetUserData('id', userId), GetItem(productId)]).then(async (values) => {
    const user = values[0];
    const product = values[1];

    if (!user || !product) {
      throw new Error('User or product not found');
    }

    if (user.balance < product.price) {
      throw new Error('Insufficient balance');
    }

    const actualBalance = user.balance - product.price;

    await Purchase(actualBalance, user.id, product.id);

    return +actualBalance.toFixed(2);
  });
};
