import { AdaptController } from '@application/adapters/AdaptController';
import { AuthController } from '@application/controllers/AuthController';
import { AuthUserValidatorDI } from '@application/di/security/validators/AuthUserValidatorDI';
import { JwtAuthValidatorDI } from '@application/di/security/validators/JwtAuthValidatorDI';
import { authServiceFacadeDI } from '@application/di/services/AuthServiceDI';
import { validateRequest } from '@application/middlewares/validators/ValidateRequest';
import {
  AuthChangePasswordDTO,
  AuthDeleteAccountDTO,
  AuthForgotPasswordDTO,
  AuthLoginDTO,
  AuthSignupDTO,
  AuthVerificationCodeDTO,
  CheckVerificationCodeDTO,
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
  '/account', 
  validateRequest({
    body: AuthSignupDTO,
  }), 
  AdaptController(authController.createAccount.bind(authController)),
);

authRouter.get(
  '/account/me',
  JwtAuthValidatorDI.validateAccess(), 
  AuthUserValidatorDI.validate(),
  AdaptController(authController.getMe.bind(authController)),
);

authRouter.post(
  '/refreshToken',
  JwtAuthValidatorDI.validateRefresh(), 
  AuthUserValidatorDI.validate(),
  AdaptController(authController.refreshToken.bind(authController)),
);

authRouter.patch(
  '/account/password',
  JwtAuthValidatorDI.validate(), 
  AuthUserValidatorDI.validate(),
  validateRequest({
    body: AuthChangePasswordDTO,
  }),
  AdaptController(authController.changePassword.bind(authController)),
);

authRouter.post(
  '/account/forgotPassword',
  validateRequest({
    body: AuthForgotPasswordDTO,
  }),
  AdaptController(authController.forgotPassword.bind(authController)),
);

authRouter.delete(
  '/account',
  JwtAuthValidatorDI.validate(), 
  AuthUserValidatorDI.validate(),
  validateRequest({
    body: AuthDeleteAccountDTO,
  }),
  AdaptController(authController.deleteAccount.bind(authController)),
);  

authRouter.post(
  '/verificationCode',
  validateRequest({
    body: AuthVerificationCodeDTO,
  }),
  AdaptController(authController.sendVerificationCode.bind(authController)),
);

authRouter.get(
  '/verificationCode',
  validateRequest({
    body: CheckVerificationCodeDTO,
  }),
  AdaptController(authController.checkVerificationCode.bind(authController)),
);

export { authRouter };


