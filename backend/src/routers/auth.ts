import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validation';
import { AuthAccess } from '../middlewares/authAccess';
import { AuthLoginDTO, AuthSignupDTO, AuthChangePasswordDTO } from '@clone-overflow/common';

const router = express.Router();
const controller = new AuthController();

router.post('/login', 
  validateRequest({
    body: AuthLoginDTO,
  }), 
  controller.login.bind(controller),
);
router.post('/signup', 
  validateRequest({
    body: AuthSignupDTO,
  }), 
  controller.signup.bind(controller),
);
router.get('/me', AuthAccess(), controller.getMe.bind(controller));
router.post('/refreshToken', controller.refreshToken.bind(controller));
router.patch(
  '/changePassword', 
  AuthAccess(), 
  validateRequest({
    body: AuthChangePasswordDTO,
  }), 
  controller.changePassword.bind(controller),
);

export { router as auth };