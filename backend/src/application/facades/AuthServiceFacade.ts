import {
  ChangePasswordInput,
  ChangePasswordOutput,
  CheckVerificationCodeInput,
  CheckVerificationCodeOutput,
  CreateAccountInput,
  CreateAccountOutput,
  DeleteAccountInput,
  DeleteAccountOutput,
  ForgotPasswordInput,
  ForgotPasswordOutput,
  GetMeInput,
  GetMeOutput,
  LoginInput,
  LoginOutput,
  RefreshTokenInput,
  RefreshTokenOutput,
  SendVerificationCodeInput,
  SendVerificationCodeOutput,
} from '@application/services/auth/usecases/dtos';

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

export class AuthServiceFacade {
  constructor (
    private loginUseCase: ILoginUseCase,
    private createAccountUseCase: ICreateAccountUseCase,
    private getMeUseCase: IGetMeUseCase,
    private deleteAccountUseCase: IDeleteAccountUseCase,
    private changePasswordUseCase: IChangePasswordUseCase,
    private forgotPasswordUseCase: IForgotPasswordUseCase,
    private checkVerificationCodeUseCase: ICheckVerificationCodeUseCase,
    private refreshTokenUseCase: IRefreshTokenUseCase,
    private sendVerificationCodeUseCase: ISendVerificationCodeUseCase,
  ) {}

  static new ({
    loginUseCase,
    createAccountUseCase,
    getMeUseCase,
    deleteAccountUseCase,
    refreshTokenUseCase,
    changePasswordUseCase,
    forgotPasswordUseCase,
    sendVerificationCodeUseCase,
    checkVerificationCodeUseCase,
  }: {
    loginUseCase: ILoginUseCase,
    createAccountUseCase: ICreateAccountUseCase,
    getMeUseCase: IGetMeUseCase,
    deleteAccountUseCase: IDeleteAccountUseCase,
    refreshTokenUseCase: IRefreshTokenUseCase,
    changePasswordUseCase: IChangePasswordUseCase,
    forgotPasswordUseCase: IForgotPasswordUseCase,
    sendVerificationCodeUseCase: ISendVerificationCodeUseCase,
    checkVerificationCodeUseCase: ICheckVerificationCodeUseCase,
  }): AuthServiceFacade {
    return new AuthServiceFacade(
      loginUseCase,
      createAccountUseCase,
      getMeUseCase,
      deleteAccountUseCase,
      changePasswordUseCase,
      forgotPasswordUseCase,
      checkVerificationCodeUseCase,
      refreshTokenUseCase,
      sendVerificationCodeUseCase,
    );
  }

  login (payload: LoginInput): Promise<LoginOutput> {
    return this.loginUseCase.execute(payload);
  }

  createAccount (payload: CreateAccountInput): Promise<CreateAccountOutput> {
    return this.createAccountUseCase.execute(payload);
  }

  async getMe (payload: GetMeInput): Promise<GetMeOutput> {
    return this.getMeUseCase.execute(payload);
  }

  deleteAccount (payload: DeleteAccountInput): Promise<DeleteAccountOutput> {
    return this.deleteAccountUseCase.execute(payload);
  }

  refreshToken (payload: RefreshTokenInput): Promise<RefreshTokenOutput> {
    return this.refreshTokenUseCase.execute(payload);
  }

  changePassword (payload: ChangePasswordInput): Promise<ChangePasswordOutput> {
    return this.changePasswordUseCase.execute(payload);
  }

  forgotPassword (payload: ForgotPasswordInput): Promise<ForgotPasswordOutput> {
    return this.forgotPasswordUseCase.execute(payload);
  }

  sendVerificationCode (payload: SendVerificationCodeInput): Promise<SendVerificationCodeOutput> {
    return this.sendVerificationCodeUseCase.execute(payload);
  }

  checkVerificationCode (payload: CheckVerificationCodeInput): Promise<CheckVerificationCodeOutput> {
    return this.checkVerificationCodeUseCase.execute(payload);
  }
}