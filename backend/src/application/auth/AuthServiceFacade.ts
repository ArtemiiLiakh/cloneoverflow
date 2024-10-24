import { AuthServiceInput } from "./dto/AuthServiceInput";
import { AuthServiceOutput } from "./dto/AuthServiceOutput";
import { ChangePasswordUseCase } from "./usecases/changePassword";
import { CreateAccountUseCase } from "./usecases/createAccount";
import { DeleteAccountUseCase } from "./usecases/deleteAccount";
import { ForgotPasswordUseCase } from "./usecases/forgotPassword";
import { ForgotPasswordResolveUseCase } from "./usecases/forgotPasswordResolve";
import { LoginUseCase } from "./usecases/login";
import { RefreshTokenUseCase } from "./usecases/refreshToken";

export class AuthServiceFacade {
  constructor (
    private loginUseCase: LoginUseCase,
    private createAccountUseCase: CreateAccountUseCase,
    private deleteAccountUseCase: DeleteAccountUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase,
    private changePasswordUseCase: ChangePasswordUseCase,
    private forgotPasswordUseCase: ForgotPasswordUseCase,
    private forgotPasswordResolveUseCase: ForgotPasswordResolveUseCase,
  ) {}

  login(payload: AuthServiceInput.Login): Promise<AuthServiceOutput.Login> {
    return this.loginUseCase.execute(payload);
  }

  createAccount(payload: AuthServiceInput.CreateAccount): Promise<AuthServiceOutput.CreateAccount> {
    return this.createAccountUseCase.execute(payload);
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

  forgotPassword(payload: AuthServiceInput.ForgotPassword): Promise<AuthServiceOutput.ForgotPassword> {
    return this.forgotPasswordUseCase.execute(payload);
  }

  forgotPasswordResolve(payload: AuthServiceInput.ForgotPasswordResolve): Promise<AuthServiceOutput.ForgotPasswordResolve> {
    return this.forgotPasswordResolveUseCase.execute(payload);
  }
}