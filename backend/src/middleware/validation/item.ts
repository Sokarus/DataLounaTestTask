import {query, body} from 'express-validator';

export const validateItemList = [
  query('appId').notEmpty().isInt().withMessage('Wrong app id'),
  query('currency').notEmpty().isString().isLength({min: 3}).withMessage('Wrong currency'),
];

export const validatePurchaseItem = [
  body('userId').notEmpty().isInt().withMessage('Username is required'),
  body('productId').notEmpty().isInt().withMessage('Wrong product id'),
];
