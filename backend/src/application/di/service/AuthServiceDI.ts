import { AuthServiceFacade } from "@app/auth/AuthServiceFacade";
import { ChangePasswordUseCase } from "@app/auth/usecases/changePassword";
import { CreateAccountUseCase } from "@app/auth/usecases/createAccount";
import { DeleteAccountUseCase } from "@app/auth/usecases/deleteAccount";
import { ForgotPasswordUseCase } from "@app/auth/usecases/forgotPassword";
import { ForgotPasswordResolveUseCase } from "@app/auth/usecases/forgotPasswordResolve";
import { LoginUseCase } from "@app/auth/usecases/login";
import { RefreshTokenUseCase } from "@app/auth/usecases/refreshToken";
import GoogleEmailProviderDI from "../email/GoogleEmailProviderDI";
import PrismaUserRepositoryDI from "../repositories/PrismaUserRepositoryDI";
import RedisCacheRepositoryDI from "../repositories/RedisCacheRepositoryDI";
import DataEncryptorDI from "../security/DataEncryptorDI";
import DataHasherDI from "../security/DataHasherDI";

export const authServiceFacadeDI = new AuthServiceFacade(
  new LoginUseCase(PrismaUserRepositoryDI, DataEncryptorDI, DataHasherDI),
  new CreateAccountUseCase(DataEncryptorDI, DataHasherDI, PrismaUserRepositoryDI),
  new DeleteAccountUseCase(PrismaUserRepositoryDI, DataHasherDI),
  new RefreshTokenUseCase(DataEncryptorDI, PrismaUserRepositoryDI),
  new ChangePasswordUseCase(PrismaUserRepositoryDI, DataHasherDI),
  new ForgotPasswordUseCase(PrismaUserRepositoryDI, GoogleEmailProviderDI, RedisCacheRepositoryDI, DataHasherDI),
  new ForgotPasswordResolveUseCase(RedisCacheRepositoryDI, PrismaUserRepositoryDI, DataHasherDI),
);

export const authUseCasesDI = {
  LoginUseCase: new LoginUseCase(PrismaUserRepositoryDI, DataEncryptorDI, DataHasherDI),
  ChangePasswordUseCase: new ChangePasswordUseCase(PrismaUserRepositoryDI, DataHasherDI),
  CreateAccountUseCase: new CreateAccountUseCase(DataEncryptorDI, DataHasherDI, PrismaUserRepositoryDI),
  DeleteAccountUseCase: new DeleteAccountUseCase(PrismaUserRepositoryDI, DataHasherDI),
  ForgotPasswordUseCase: new ForgotPasswordUseCase(PrismaUserRepositoryDI, GoogleEmailProviderDI, RedisCacheRepositoryDI, DataHasherDI),
  ForgotPasswordResolveUseCase: new ForgotPasswordResolveUseCase(RedisCacheRepositoryDI, PrismaUserRepositoryDI, DataHasherDI),
  RefreshTokenUseCase: new RefreshTokenUseCase(DataEncryptorDI, PrismaUserRepositoryDI),
};