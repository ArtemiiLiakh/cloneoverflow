import {
  ChangePasswordInput,
  ChangePasswordOutput,
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
} from '@application/auth/usecases/dtos';

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

export class AuthService {
  constructor (
    private loginUseCase: ILoginUseCase,
    private createAccountUseCase: ICreateAccountUseCase,
    private getMeUseCase: IGetMeUseCase,
    private deleteAccountUseCase: IDeleteAccountUseCase,
    private changePasswordUseCase: IChangePasswordUseCase,
    private forgotPasswordUseCase: IForgotPasswordUseCase,
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
  }: {
    loginUseCase: ILoginUseCase,
    createAccountUseCase: ICreateAccountUseCase,
    getMeUseCase: IGetMeUseCase,
    deleteAccountUseCase: IDeleteAccountUseCase,
    refreshTokenUseCase: IRefreshTokenUseCase,
    changePasswordUseCase: IChangePasswordUseCase,
    forgotPasswordUseCase: IForgotPasswordUseCase,
    sendVerificationCodeUseCase: ISendVerificationCodeUseCase,
  }): AuthService {
    return new AuthService(
      loginUseCase,
      createAccountUseCase,
      getMeUseCase,
      deleteAccountUseCase,
      changePasswordUseCase,
      forgotPasswordUseCase,
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

  getMe (payload: GetMeInput): Promise<GetMeOutput> {
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
}