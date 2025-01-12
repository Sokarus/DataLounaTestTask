import {Request, Response} from 'express';
import {DoGetItems, DoPurchaseProduct} from '@services/item';

export const getItems = async (req: Request, res: Response) => {
  const {appId, currency} = req.query;

  try {
    const items = await DoGetItems(Number(appId), currency?.toString() || '');

    res.send(items);
  } catch (err) {
    res.status(400).send({error: (err as Error).message});
  }
};

export const purchaseProduct = async (req: Request, res: Response) => {
  const {userId, productId} = req.body;

  try {
    const balance = await DoPurchaseProduct(userId, productId);

    res.send({balance});
  } catch (err) {
    res.status(400).send({error: (err as Error).message});
  }
};
