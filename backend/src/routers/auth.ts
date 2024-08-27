import { AuthController } from '@/controllers/auth.controller';
import { AuthAccess } from '@/middlewares/authAccess';
import { validateRequest } from '@/middlewares/validation';
import { authService } from '@/services';
import {
  AuthChangePasswordDTO,
  AuthForgotPasswordDTO,
  AuthForgotPasswordResolveDTO, 
  AuthLoginDTO, 
  AuthSignupDTO,
} from '@cloneoverflow/common';
import express from 'express';

const auth = express.Router();
const controller = new AuthController(authService);

auth.post('/login', 
  validateRequest({
    body: AuthLoginDTO,
  }), 
  controller.login.bind(controller),
);

auth.post('/signup', 
  validateRequest({
    body: AuthSignupDTO,
  }), 
  controller.signup.bind(controller),
);

auth.get('/signout', 
  AuthAccess(),
  controller.signout.bind(controller)
);

auth.get('/me', 
  AuthAccess(), 
  controller.getMe.bind(controller)
);

auth.post('/refreshToken', 
  controller.refreshToken.bind(controller)
);

auth.post(
  '/changePassword', 
  AuthAccess(), 
  validateRequest({
    body: AuthChangePasswordDTO,
  }), 
  controller.changePassword.bind(controller),
);

auth.post(
  '/forgotPassword',
  validateRequest({
    body: AuthForgotPasswordDTO,
  }),
  controller.forgotPassword.bind(controller),
);

auth.post(
  '/forgotPassword/resolve',
  validateRequest({
    body: AuthForgotPasswordResolveDTO,
  }),
  controller.forgotPasswordResolve.bind(controller),
);

export { auth };
