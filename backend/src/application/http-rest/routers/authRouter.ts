import { AdaptController } from '@application/adapters/AdaptController';
import { AuthController } from '@application/controllers/AuthController';
import { authServiceFacadeDI } from '@application/di/services/AuthServiceDI';
import { JwtAuthAccess } from '@application/middlewares/JwtAuthAccess';
import { JwtAuthRefresh } from '@application/middlewares/JwtAuthRefresh';
import { validateRequest } from '@application/middlewares/validation';
import {
  AuthChangePasswordDTO,
  AuthDeleteAccountDTO,
  AuthForgotPasswordDTO,
  AuthLoginDTO,
  AuthSignupDTO,
  AuthVerificationCodeDTO,
} from '@cloneoverflow/common';
import express from 'express';

const authRouter = express.Router();

const authController = new AuthController(authServiceFacadeDI);

authRouter.post(
  '/login', 
  validateRequest({
    body: AuthLoginDTO,
  }), 
  AdaptController(authController.login.bind(authController)),
);

authRouter.post(
  '/signup', 
  validateRequest({
    body: AuthSignupDTO,
  }), 
  AdaptController(authController.signup.bind(authController)),
);

authRouter.get(
  '/me',
  JwtAuthAccess(), 
  AdaptController(authController.getMe.bind(authController)),
);

authRouter.post(
  '/refreshToken',
  JwtAuthRefresh(), 
  AdaptController(authController.refreshToken.bind(authController)),
);

authRouter.post(
  '/changePassword',
  JwtAuthAccess(),
  validateRequest({
    body: AuthChangePasswordDTO,
  }),
  AdaptController(authController.changePassword.bind(authController)),
);

authRouter.post(
  '/forgotPassword',
  validateRequest({
    body: AuthForgotPasswordDTO,
  }),
  AdaptController(authController.forgotPassword.bind(authController)),
);

authRouter.delete(
  '/deleteAccount',
  JwtAuthRefresh(), 
  JwtAuthAccess(),
  validateRequest({
    body: AuthDeleteAccountDTO,
  }),
  AdaptController(authController.deleteAccount.bind(authController)),
);  

authRouter.post(
  '/sendVerificationCode',
  validateRequest({
    body: AuthVerificationCodeDTO,
  }),
  AdaptController(authController.sendVerificationCode.bind(authController)),
);

export { authRouter };


