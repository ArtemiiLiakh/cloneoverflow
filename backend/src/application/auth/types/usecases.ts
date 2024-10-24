import { UseCase } from "@common/usecase/UseCase";
import { AuthServiceInput } from "../dto/AuthServiceInput";
import { AuthServiceOutput } from "../dto/AuthServiceOutput";

export interface IChangePasswordUseCase extends UseCase<AuthServiceInput.ChangePassword, AuthServiceOutput.ChangePassword> {}
export interface ICreateAccountUseCase extends UseCase<AuthServiceInput.CreateAccount, AuthServiceOutput.CreateAccount> {}
export interface IDeleteAccountUseCase extends UseCase<AuthServiceInput.DeleteAccount, AuthServiceOutput.DeleteAccount> {}
export interface IForgotPasswordUseCase extends UseCase<AuthServiceInput.ForgotPassword, AuthServiceOutput.ForgotPassword> {}
export interface IForgotPasswordResolveUseCase extends UseCase<AuthServiceInput.ForgotPasswordResolve, AuthServiceOutput.ForgotPasswordResolve> {}
export interface ILoginUseCase extends UseCase<AuthServiceInput.Login, AuthServiceOutput.Login> {}
export interface IRefreshTokenUseCase extends UseCase<AuthServiceInput.RefreshToken, AuthServiceOutput.RefreshToken> {}