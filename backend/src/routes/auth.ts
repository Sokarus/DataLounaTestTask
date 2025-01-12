import express from 'express';
import {register, login, changePassword} from '@controllers/auth';
import {
  validateRegistration,
  validateLogin,
  validateChangePassword,
  validate,
} from '@middleware/validation';

const router = express.Router();

router.post('/register', validateRegistration, validate, register);
router.post('/login', validateLogin, validate, login);
router.post('/change-password', validateChangePassword, changePassword);

export default router;
