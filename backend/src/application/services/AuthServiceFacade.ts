import { ChangePasswordInput, ChangePasswordOutput } from '@application/auth/services/changePassword/dto';
import { CreateAccountInput, CreateAccountOutput } from '@application/auth/services/createAccount/dto';
import { DeleteAccountInput, DeleteAccountOutput } from '@application/auth/services/deleteAccount/dto';
import { ForgotPasswordInput, ForgotPasswordOutput } from '@application/auth/services/forgotPassword/dto';
import { GetMeInput, GetMeOutput } from '@application/auth/services/getMe/dto';
import { LoginInput, LoginOutput } from '@application/auth/services/login/dto';
import { RefreshTokenInput, RefreshTokenOutput } from '@application/auth/services/refreshToken/dto';
import { SendVerificationCodeInput, SendVerificationCodeOutput } from '@application/auth/services/sendVerificationCode/dto';
import {
  IChangePasswordUseCase,
  ICreateAccountUseCase,
  IDeleteAccountUseCase,
  IForgotPasswordUseCase,
  IGetMeUseCase,
  ILoginUseCase,
  IRefreshTokenUseCase,
  ISendVerificationCodeUseCase,
} from '@application/auth/services/types';

export class AuthServiceFacade {
  constructor (
    private loginUseCase: ILoginUseCase,
    private createAccountUseCase: ICreateAccountUseCase,
    private getMeUseCase: IGetMeUseCase,
    private deleteAccountUseCase: IDeleteAccountUseCase,
    private refreshTokenUseCase: IRefreshTokenUseCase,
    private changePasswordUseCase: IChangePasswordUseCase,
    private forgotPasswordUseCase: IForgotPasswordUseCase,
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
  }) {
    return new AuthServiceFacade(
      loginUseCase,
      createAccountUseCase,
      getMeUseCase,
      deleteAccountUseCase,
      refreshTokenUseCase,
      changePasswordUseCase,
      forgotPasswordUseCase,
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
}