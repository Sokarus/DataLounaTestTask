import {body, validationResult} from 'express-validator';
import {Request, Response, NextFunction} from 'express';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({errors: errors.array()});

    return;
  }

  next();
};

export const validatePurchase = [
  body('productId').isInt().withMessage('Product ID must be an integer'),
  body('quantity').isInt({min: 1}).withMessage('Quantity must be at least 1'),
  body('price').isFloat({min: 0.01}).withMessage('Price must be a positive number'),
];
