import {body} from 'express-validator';

export const validateRegistration = [
  body('username').notEmpty().isLength({min: 3}).withMessage('Password must be at least 3 characters long'),
  body('password').notEmpty().isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
];

export const validateLogin = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const validateChangePassword = [
  body('username').notEmpty().withMessage('Username is required'),
  body('oldPassword').notEmpty().withMessage('Password is required'),
  body('newPassword').isLength({min: 6}).withMessage('New password must be at least 6 characters long'),
];
