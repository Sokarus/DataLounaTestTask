import axios from 'axios';
import {SKINPORT_URL} from '@constants/api';

const API_URL = `${SKINPORT_URL}items`;

export type Item = {
  market_hash_name: string;
  currency: string;
  suggested_price: number;
  item_page: string;
  market_page: string;
  min_price: number;
  max_price: number;
  mean_price: number;
  median_price: number;
  quantity: number;
  created_at: number;
  updated_at: number;
};

export const GetItems = async (appId: number, currency: string, tradable: boolean) => {
  const {data}: {data: Item[]} = await axios.get(API_URL, {
    params: {app_id: appId, currency, tradable},
  });

  return data;
};
