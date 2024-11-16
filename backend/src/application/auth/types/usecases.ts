import { UseCase } from '@common/usecase/UseCase';
import { AuthServiceInput } from '../dto/AuthServiceInput';
import { AuthServiceOutput } from '../dto/AuthServiceOutput';

export interface ILoginUseCase extends UseCase<AuthServiceInput.Login, AuthServiceOutput.Login> {}
export interface ISignUpUseCase extends UseCase<AuthServiceInput.SignUp, AuthServiceOutput.SignUp> {}
export interface IDeleteAccountUseCase extends UseCase<AuthServiceInput.DeleteAccount, AuthServiceOutput.DeleteAccount> {}
export interface IChangePasswordUseCase extends UseCase<AuthServiceInput.ChangePassword, AuthServiceOutput.ChangePassword> {}
export interface IForgotPasswordUseCase extends UseCase<AuthServiceInput.ForgotPassword, AuthServiceOutput.ForgotPassword> {}
export interface IRefreshTokenUseCase extends UseCase<AuthServiceInput.RefreshToken, AuthServiceOutput.RefreshToken> {}
export interface ISendVerificationCodeUseCase extends UseCase<AuthServiceInput.SendVerificationCode, AuthServiceOutput.SendVerificationCode> {}