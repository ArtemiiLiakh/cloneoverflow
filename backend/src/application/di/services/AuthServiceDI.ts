import {
  ChangePasswordUseCase,
  CreateAccountUseCase,
  DeleteAccountUseCase,
  ForgotPasswordUseCase,
  GetMeUseCase,
  LoginUseCase,
  RefreshTokenUseCase,
  SendVerificationCodeUseCase,
} from '@application/auth/services';
import { AuthServiceFacade } from '@application/services/AuthServiceFacade';
import GoogleEmailProviderDI from '../email/GoogleEmailProviderDI';
import { PrismaUserRepositoryDI } from '../repositories/PrismaRepositoriesDI';
import RedisCacheRepositoryDI from '../repositories/RedisCacheRepositoryDI';
import { DataHasherDI } from '../security/hashers/DataHasherDI';
import { JwtEncryptorDI } from '../security/JwtEncryptorDI';
import { userUseCasesDI } from './UserServiceDI';

const LoginUseCaseDI = new LoginUseCase(
  PrismaUserRepositoryDI, 
  JwtEncryptorDI, 
  DataHasherDI,
);

const CreateAccountUseCaseDI = new CreateAccountUseCase(
  JwtEncryptorDI, 
  userUseCasesDI.CreateUseCaseDI,
);

const RefreshTokenUseCaseDI = new RefreshTokenUseCase(
  JwtEncryptorDI, 
  PrismaUserRepositoryDI,
);

const ChangePasswordUseCaseDI = new ChangePasswordUseCase(
  PrismaUserRepositoryDI, 
  RedisCacheRepositoryDI, 
  DataHasherDI,
);

const ForgotPasswordUseCaseDI = new ForgotPasswordUseCase(
  PrismaUserRepositoryDI, 
  RedisCacheRepositoryDI, 
  DataHasherDI,
);

const DeleteAccountUseCaseDI = new DeleteAccountUseCase(
  PrismaUserRepositoryDI, 
  RedisCacheRepositoryDI, 
  DataHasherDI,
);

const SendVerificationCodeUseCaseDI = new SendVerificationCodeUseCase(
  PrismaUserRepositoryDI, 
  GoogleEmailProviderDI, 
  RedisCacheRepositoryDI, 
  DataHasherDI,
);

const GetMeUseCaseDI = new GetMeUseCase(
  PrismaUserRepositoryDI,
);

export const authServiceFacadeDI = AuthServiceFacade.new({
  loginUseCase: LoginUseCaseDI,
  createAccountUseCase: CreateAccountUseCaseDI,
  getMeUseCase: GetMeUseCaseDI,
  deleteAccountUseCase: DeleteAccountUseCaseDI,
  refreshTokenUseCase: RefreshTokenUseCaseDI,
  changePasswordUseCase: ChangePasswordUseCaseDI,
  forgotPasswordUseCase: ForgotPasswordUseCaseDI,
  sendVerificationCodeUseCase: SendVerificationCodeUseCaseDI,
});

export const authUseCasesDI = {
  LoginUseCaseDI,
  CreateAccountUseCaseDI,
  DeleteAccountUseCaseDI,
  RefreshTokenUseCaseDI,
  ChangePasswordUseCaseDI,
  ForgotPasswordUseCaseDI,
  SendVerificationCodeUseCaseDI,
};