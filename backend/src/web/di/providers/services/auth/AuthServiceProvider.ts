import { AuthService } from '@application/auth/AuthService';
import {
  IChangePasswordUseCase,
  ICreateAccountUseCase,
  IDeleteAccountUseCase,
  IForgotPasswordUseCase,
  IGetMeUseCase,
  ILoginUseCase,
  IRefreshTokenUseCase,
  ISendVerificationCodeUseCase,
} from '@application/auth/usecases/types';
import { Provider } from '@nestjs/common';
import { AuthServiceDIToken, AuthUseCaseDITokens } from '@web/di/tokens/services';

export const AuthServiceProvider: Provider = {
  provide: AuthServiceDIToken,
  
  useFactory: (
    changePasswordUseCase: IChangePasswordUseCase,
    createAccountUseCase: ICreateAccountUseCase,
    deleteAccountUseCase: IDeleteAccountUseCase,
    forgotPasswordUseCase: IForgotPasswordUseCase,
    getMeUseCase: IGetMeUseCase,
    loginUseCase: ILoginUseCase,
    refreshTokenUseCase: IRefreshTokenUseCase,
    sendVerificationCodeUseCase: ISendVerificationCodeUseCase,
  ) => AuthService.new({
    changePasswordUseCase,
    createAccountUseCase,
    deleteAccountUseCase,
    forgotPasswordUseCase,
    getMeUseCase,
    loginUseCase,
    refreshTokenUseCase,
    sendVerificationCodeUseCase,
  }),

  inject: [
    AuthUseCaseDITokens.ChangePassword,
    AuthUseCaseDITokens.CreateAccount,
    AuthUseCaseDITokens.DeleteAccount,
    AuthUseCaseDITokens.ForgotPassword,
    AuthUseCaseDITokens.GetMe,
    AuthUseCaseDITokens.Login,
    AuthUseCaseDITokens.RefreshToken,
    AuthUseCaseDITokens.SendVerificationCode,
  ],
};