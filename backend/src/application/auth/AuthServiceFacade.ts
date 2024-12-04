import { IUserGetUseCase } from '@core/services/user/types/usecases';
import { AuthServiceInput } from './dtos/AuthServiceInput';
import { AuthServiceOutput } from './dtos/AuthServiceOutput';
import {
  IChangePasswordUseCase,
  ISendVerificationCodeUseCase,
  IDeleteAccountUseCase,
  IForgotPasswordUseCase,
  ILoginUseCase,
  IRefreshTokenUseCase,
  ISignUpUseCase,
} from './types/usecases';
import { ForbiddenException } from '@cloneoverflow/common';

export class AuthServiceFacade {
  constructor (
    private loginUseCase: ILoginUseCase,
    private signUpUseCase: ISignUpUseCase,
    private getUserUseCase: IUserGetUseCase,
    private deleteAccountUseCase: IDeleteAccountUseCase,
    private refreshTokenUseCase: IRefreshTokenUseCase,
    private changePasswordUseCase: IChangePasswordUseCase,
    private forgotPasswordUseCase: IForgotPasswordUseCase,
    private sendVerificationCodeUseCase: ISendVerificationCodeUseCase,
  ) {}

  static new ({
    loginUseCase,
    signUpUseCase,
    getUserUseCase,
    deleteAccountUseCase,
    refreshTokenUseCase,
    changePasswordUseCase,
    forgotPasswordUseCase,
    sendVerificationCodeUseCase,
  }: {
    loginUseCase: ILoginUseCase,
    signUpUseCase: ISignUpUseCase,
    getUserUseCase: IUserGetUseCase,
    deleteAccountUseCase: IDeleteAccountUseCase,
    refreshTokenUseCase: IRefreshTokenUseCase,
    changePasswordUseCase: IChangePasswordUseCase,
    forgotPasswordUseCase: IForgotPasswordUseCase,
    sendVerificationCodeUseCase: ISendVerificationCodeUseCase,
  }) {
    return new AuthServiceFacade(
      loginUseCase,
      signUpUseCase,
      getUserUseCase,
      deleteAccountUseCase,
      refreshTokenUseCase,
      changePasswordUseCase,
      forgotPasswordUseCase,
      sendVerificationCodeUseCase,
    );
  }

  login (payload: AuthServiceInput.Login): Promise<AuthServiceOutput.Login> {
    return this.loginUseCase.execute(payload);
  }

  signUp (payload: AuthServiceInput.SignUp): Promise<AuthServiceOutput.SignUp> {
    return this.signUpUseCase.execute(payload);
  }

  async getMe ({ executorId: id }: AuthServiceInput.GetMe): Promise<AuthServiceOutput.GetMe> {
    const user = await this.getUserUseCase.execute({
      userId: id,
    }).catch(() => {
      throw new ForbiddenException();
    });

    return user.entity;
  }

  deleteAccount (payload: AuthServiceInput.DeleteAccount): Promise<AuthServiceOutput.DeleteAccount> {
    return this.deleteAccountUseCase.execute(payload);
  }

  refreshToken (payload: AuthServiceInput.RefreshToken): Promise<AuthServiceOutput.RefreshToken> {
    return this.refreshTokenUseCase.execute(payload);
  }

  changePassword (payload: AuthServiceInput.ChangePassword): Promise<AuthServiceOutput.ChangePassword> {
    return this.changePasswordUseCase.execute(payload);
  }

  forgotPassword (payload: AuthServiceInput.ForgotPassword): Promise<AuthServiceOutput.ForgotPassword> {
    return this.forgotPasswordUseCase.execute(payload);
  }

  sendVerificationCode (payload: AuthServiceInput.SendVerificationCode): Promise<AuthServiceOutput.SendVerificationCode> {
    return this.sendVerificationCodeUseCase.execute(payload);
  }
}