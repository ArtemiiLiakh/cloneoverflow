import { AdaptController } from '@app/adapters/AdaptController';
import { AuthController } from '@app/controllers/AuthController';
import { authServiceFacadeDI } from '@app/di/service/AuthServiceDI';
import { userUseCasesDI } from '@app/di/service/UserServiceDI';
import { JwtAuthAccess } from '@app/middlewares/JwtAuthAccess';
import { JwtAuthRefresh } from '@app/middlewares/JwtAuthRefresh';
import { validateRequest } from '@app/middlewares/validation';
import {
  AuthForgotPasswordDTO,
  AuthForgotPasswordResolveDTO,
  AuthLoginDTO,
  AuthSignupDTO
} from '@cloneoverflow/common';
import express from 'express';

const authRouter = express.Router();

const authController = new AuthController(
  authServiceFacadeDI, 
  userUseCasesDI.GetUseCase
);

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
  AdaptController(authController.signup.bind(authController))
);

authRouter.get(
  '/me',
  JwtAuthAccess(), 
  AdaptController(authController.getMe.bind(authController))
);

authRouter.post(
  '/refreshToken',
  JwtAuthRefresh(), 
  AdaptController(authController.refreshToken.bind(authController))
);

authRouter.post(
  '/forgotPassword',
  validateRequest({
    body: AuthForgotPasswordDTO,
  }),
  AdaptController(authController.forgotPassword.bind(authController))
);

authRouter.post(
  '/forgotPassword/resolve',
  validateRequest({
    body: AuthForgotPasswordResolveDTO,
  }),
  AdaptController(authController.forgotPasswordResolve.bind(authController))
);  

export { authRouter };


