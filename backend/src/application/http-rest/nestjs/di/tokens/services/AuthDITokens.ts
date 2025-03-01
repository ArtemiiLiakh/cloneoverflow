import { AuthServiceFacade } from '@application/facades/AuthServiceFacade';
import {
  ChangePasswordUseCase,
  CheckVerificationCodeUseCase,
  CreateAccountUseCase,
  DeleteAccountUseCase,
  ForgotPasswordUseCase,
  GetMeUseCase,
  LoginUseCase,
  RefreshTokenUseCase,
  SendVerificationCodeUseCase,
} from '@application/services/auth/usecases';

export const AuthUseCaseDITokens = {
  ChangePassword: Symbol(ChangePasswordUseCase.name),
  CheckVerification: Symbol(CheckVerificationCodeUseCase.name),
  CreateAccount: Symbol(CreateAccountUseCase.name),
  DeleteAccount: Symbol(DeleteAccountUseCase.name),
  ForgotPassword: Symbol(ForgotPasswordUseCase.name),
  GetMe: Symbol(GetMeUseCase.name),
  Login: Symbol(LoginUseCase.name),
  RefreshToken: Symbol(RefreshTokenUseCase.name),
  SendVerificationCode: Symbol(SendVerificationCodeUseCase.name),
};

export const AuthServiceDIToken = Symbol(AuthServiceFacade.name);