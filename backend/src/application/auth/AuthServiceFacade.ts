import { IUserGetUseCase } from "@core/service/user/types/usecases";
import { AuthServiceInput } from "./dto/AuthServiceInput";
import { AuthServiceOutput } from "./dto/AuthServiceOutput";
import {
  IChangePasswordResolveUseCase,
  IChangePasswordUseCase,
  IDeleteAccountUseCase,
  IForgotPasswordResolveUseCase,
  IForgotPasswordUseCase,
  ILoginUseCase,
  IRefreshTokenUseCase,
  ISignUpUseCase
} from "./types/usecases";

export class AuthServiceFacade {
  constructor (
    private loginUseCase: ILoginUseCase,
    private signUpUseCase: ISignUpUseCase,
    private getUserUseCase: IUserGetUseCase,
    private deleteAccountUseCase: IDeleteAccountUseCase,
    private refreshTokenUseCase: IRefreshTokenUseCase,
    private changePasswordUseCase: IChangePasswordUseCase,
    private changePasswordResolveUseCase: IChangePasswordResolveUseCase,
    private forgotPasswordUseCase: IForgotPasswordUseCase,
    private forgotPasswordResolveUseCase: IForgotPasswordResolveUseCase,
  ) {}

  static new({
    loginUseCase,
    signUpUseCase,
    getUserUseCase,
    deleteAccountUseCase,
    refreshTokenUseCase,
    changePasswordUseCase,
    changePasswordResolveUseCase,
    forgotPasswordUseCase,
    forgotPasswordResolveUseCase,
  }: {
    loginUseCase: ILoginUseCase,
    signUpUseCase: ISignUpUseCase,
    getUserUseCase: IUserGetUseCase,
    deleteAccountUseCase: IDeleteAccountUseCase,
    refreshTokenUseCase: IRefreshTokenUseCase,
    changePasswordUseCase: IChangePasswordUseCase,
    changePasswordResolveUseCase: IChangePasswordResolveUseCase,
    forgotPasswordUseCase: IForgotPasswordUseCase,
    forgotPasswordResolveUseCase: IForgotPasswordResolveUseCase,
  }) {
    return new AuthServiceFacade(
      loginUseCase,
      signUpUseCase,
      getUserUseCase,
      deleteAccountUseCase,
      refreshTokenUseCase,
      changePasswordUseCase,
      changePasswordResolveUseCase,
      forgotPasswordUseCase,
      forgotPasswordResolveUseCase,  
    );
  }

  login(payload: AuthServiceInput.Login): Promise<AuthServiceOutput.Login> {
    return this.loginUseCase.execute(payload);
  }

  signUp(payload: AuthServiceInput.SignUp): Promise<AuthServiceOutput.SignUp> {
    return this.signUpUseCase.execute(payload);
  }

  async getMe({ id }: AuthServiceInput.GetMe): Promise<AuthServiceOutput.GetMe> {
    const user = await this.getUserUseCase.execute({
      userId: id,
    });

    return user.entity;
  }

  deleteAccount(payload: AuthServiceInput.DeleteAccount): Promise<AuthServiceOutput.DeleteAccount> {
    return this.deleteAccountUseCase.execute(payload);
  }

  refreshToken(payload: AuthServiceInput.RefreshToken): Promise<AuthServiceOutput.RefreshToken> {
    return this.refreshTokenUseCase.execute(payload);
  }

  changePassword(payload: AuthServiceInput.ChangePassword): Promise<AuthServiceOutput.ChangePassword> {
    return this.changePasswordUseCase.execute(payload);
  }

  changePasswordResolve(payload: AuthServiceInput.ChangePasswordResolve): Promise<AuthServiceOutput.ChangePasswordResolve> {
    return this.changePasswordResolveUseCase.execute(payload);
  }

  forgotPassword(payload: AuthServiceInput.ForgotPassword): Promise<AuthServiceOutput.ForgotPassword> {
    return this.forgotPasswordUseCase.execute(payload);
  }

  forgotPasswordResolve(payload: AuthServiceInput.ForgotPasswordResolve): Promise<AuthServiceOutput.ForgotPasswordResolve> {
    return this.forgotPasswordResolveUseCase.execute(payload);
  }
}