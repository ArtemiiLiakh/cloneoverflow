import { AuthServiceFacade } from '@application/service-facades/AuthServiceFacade';
import {
  IChangePasswordUseCase,
  ICheckVerificationCodeUseCase,
  ICreateAccountUseCase,
  IDeleteAccountUseCase,
  IForgotPasswordUseCase,
  IGetMeUseCase,
  ILoginUseCase,
  IRefreshTokenUseCase,
  ISendVerificationCodeUseCase,
} from '@application/services/auth/usecases/types';
import { Provider } from '@nestjs/common';
import { AuthServiceDIToken, AuthUseCaseDITokens } from '../../../tokens/services';

export const AuthServiceProvider: Provider = {
  provide: AuthServiceDIToken,
  
  useFactory: (
    changePasswordUseCase: IChangePasswordUseCase,
    checkVerificationCodeUseCase: ICheckVerificationCodeUseCase,
    createAccountUseCase: ICreateAccountUseCase,
    deleteAccountUseCase: IDeleteAccountUseCase,
    forgotPasswordUseCase: IForgotPasswordUseCase,
    getMeUseCase: IGetMeUseCase,
    loginUseCase: ILoginUseCase,
    refreshTokenUseCase: IRefreshTokenUseCase,
    sendVerificationCodeUseCase: ISendVerificationCodeUseCase,
  ) => AuthServiceFacade.new({
    changePasswordUseCase,
    checkVerificationCodeUseCase,
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
    AuthUseCaseDITokens.CheckVerification,
    AuthUseCaseDITokens.CreateAccount,
    AuthUseCaseDITokens.DeleteAccount,
    AuthUseCaseDITokens.ForgotPassword,
    AuthUseCaseDITokens.GetMe,
    AuthUseCaseDITokens.Login,
    AuthUseCaseDITokens.RefreshToken,
    AuthUseCaseDITokens.SendVerificationCode,
  ],
};