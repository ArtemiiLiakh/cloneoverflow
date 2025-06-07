import { AuthService } from '@application/auth/AuthService';
import {
  ChangePasswordUseCase,
  CreateAccountUseCase,
  DeleteAccountUseCase,
  ForgotPasswordUseCase,
  GetMeUseCase,
  LoginUseCase,
  RefreshTokenUseCase,
  SendVerificationCodeUseCase,
} from '@application/auth/usecases';

export const AuthUseCaseDITokens = {
  ChangePassword: Symbol(ChangePasswordUseCase.name),
  CreateAccount: Symbol(CreateAccountUseCase.name),
  DeleteAccount: Symbol(DeleteAccountUseCase.name),
  ForgotPassword: Symbol(ForgotPasswordUseCase.name),
  GetMe: Symbol(GetMeUseCase.name),
  Login: Symbol(LoginUseCase.name),
  RefreshToken: Symbol(RefreshTokenUseCase.name),
  SendVerificationCode: Symbol(SendVerificationCodeUseCase.name),
};

export const AuthServiceDIToken = Symbol(AuthService.name);