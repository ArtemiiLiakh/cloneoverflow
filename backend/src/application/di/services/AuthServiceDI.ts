import { AuthServiceFacade } from "@app/auth/AuthServiceFacade";
import { ChangePasswordUseCase } from "@app/auth/usecases/changePassword";
import { ChangePasswordResolveUseCase } from "@app/auth/usecases/changePasswordResolve";
import { DeleteAccountUseCase } from "@app/auth/usecases/deleteAccount";
import { ForgotPasswordUseCase } from "@app/auth/usecases/forgotPassword";
import { ForgotPasswordResolveUseCase } from "@app/auth/usecases/forgotPasswordResolve";
import { LoginUseCase } from "@app/auth/usecases/login";
import { RefreshTokenUseCase } from "@app/auth/usecases/refreshToken";
import { SignUpUseCase } from "@app/auth/usecases/signup";
import GoogleEmailProviderDI from "../email/GoogleEmailProviderDI";
import PrismaUserRepositoryDI from "../repositories/PrismaUserRepositoryDI";
import RedisCacheRepositoryDI from "../repositories/RedisCacheRepositoryDI";
import DataEncryptorDI from "../security/DataEncryptorDI";
import DataHasherDI from "../security/DataHasherDI";
import { userUseCasesDI } from "./UserServiceDI";

const LoginUseCaseDI = new LoginUseCase(PrismaUserRepositoryDI, DataEncryptorDI, DataHasherDI);
const SignUpUseCaseDI = new SignUpUseCase(DataEncryptorDI, DataHasherDI, userUseCasesDI.CreateUseCaseDI);
const DeleteAccountUseCaseDI = new DeleteAccountUseCase(PrismaUserRepositoryDI, DataHasherDI);
const RefreshTokenUseCaseDI = new RefreshTokenUseCase(DataEncryptorDI, PrismaUserRepositoryDI);
const ChangePasswordUseCaseDI = new ChangePasswordUseCase(GoogleEmailProviderDI, RedisCacheRepositoryDI, PrismaUserRepositoryDI, DataHasherDI);
const ChangePasswordResolveUseCaseDI = new ChangePasswordResolveUseCase(PrismaUserRepositoryDI, RedisCacheRepositoryDI, DataHasherDI);
const ForgotPasswordUseCaseDI = new ForgotPasswordUseCase(PrismaUserRepositoryDI, GoogleEmailProviderDI, RedisCacheRepositoryDI, DataHasherDI);
const ForgotPasswordResolveUseCaseDI = new ForgotPasswordResolveUseCase(RedisCacheRepositoryDI, PrismaUserRepositoryDI, DataHasherDI);

export const authServiceFacadeDI = AuthServiceFacade.new({
  loginUseCase: LoginUseCaseDI,
  signUpUseCase: SignUpUseCaseDI,
  getUserUseCase: userUseCasesDI.GetUseCaseDI,
  deleteAccountUseCase: DeleteAccountUseCaseDI,
  refreshTokenUseCase: RefreshTokenUseCaseDI,
  changePasswordUseCase: ChangePasswordUseCaseDI,
  changePasswordResolveUseCase: ChangePasswordResolveUseCaseDI,
  forgotPasswordUseCase: ForgotPasswordUseCaseDI,
  forgotPasswordResolveUseCase: ForgotPasswordResolveUseCaseDI,
});

export const authUseCasesDI = {
  LoginUseCaseDI,
  SignUpUseCaseDI,
  DeleteAccountUseCaseDI,
  RefreshTokenUseCaseDI,
  ChangePasswordUseCaseDI,
  ChangePasswordResolveUseCaseDI,
  ForgotPasswordUseCaseDI,
  ForgotPasswordResolveUseCaseDI,
};