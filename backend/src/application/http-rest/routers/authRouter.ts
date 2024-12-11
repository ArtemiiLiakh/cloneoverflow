import { AdaptController } from '@application/adapters/AdaptController';
import { AuthController } from '@application/controllers/AuthController';
import { AuthUserStatusValidatorDI } from '@application/di/security/AuthUserStatusValidatorDI';
import { JwtTokenValidatorDI } from '@application/di/security/JwtTokenValidatorDI';
import { authServiceFacadeDI } from '@application/di/services/AuthServiceDI';
import { validateRequest } from '@application/middlewares/security/ValidateRequest';
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
  JwtTokenValidatorDI.validateAccess(), 
  AuthUserStatusValidatorDI.validate(),
  AdaptController(authController.getMe.bind(authController)),
);

authRouter.post(
  '/refreshToken',
  JwtTokenValidatorDI.validateRefresh(), 
  AuthUserStatusValidatorDI.validate(),
  AdaptController(authController.refreshToken.bind(authController)),
);

authRouter.post(
  '/changePassword',
  JwtTokenValidatorDI.validateAccess(),
  AuthUserStatusValidatorDI.validate(),
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
  JwtTokenValidatorDI.validateRefresh(), 
  JwtTokenValidatorDI.validateAccess(),
  AuthUserStatusValidatorDI.validate(),
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


