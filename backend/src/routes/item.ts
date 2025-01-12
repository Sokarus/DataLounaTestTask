import express from 'express';
import {getItems, purchaseProduct} from '@controllers/item';
import {validateItemList, validatePurchaseItem, validate} from '@middleware/validation';

const router = express.Router();

router.get('/list', validateItemList, validate, getItems);
router.post('/purchase', validatePurchaseItem, validate, purchaseProduct);

export default router;
