import {
  ChangePasswordUseCase,
  CheckVerificationCodeUseCase,
  CreateAccountUseCase,
  DeleteAccountUseCase,
  ForgotPasswordUseCase,
  GetMeUseCase,
  LoginUseCase,
  RefreshTokenUseCase,
  SendVerificationCodeUseCase,
} from '@application/services/auth/usecases';

import { AuthServiceFacade } from '@application/facades/AuthServiceFacade';
import { GoogleEmailProviderDI } from '../email/GoogleEmailProviderDI';
import { PrismaUserRepositoryDI } from '../repositories/PrismaRepositoriesDI';
import { RedisCacheRepositoryDI } from '../repositories/RedisCacheRepositoryDI';
import { DataHasherDI } from '../security/hashers/DataHasherDI';
import { JwtEncryptorDI } from '../security/JwtEncryptorDI';
import { VerificationCodeValidatorDI } from '../security/validators/VerificationCodeValidatorDI';
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
  VerificationCodeValidatorDI,
  PrismaUserRepositoryDI, 
  RedisCacheRepositoryDI, 
  DataHasherDI,
);

const ForgotPasswordUseCaseDI = new ForgotPasswordUseCase(
  VerificationCodeValidatorDI,
  PrismaUserRepositoryDI, 
  RedisCacheRepositoryDI, 
  DataHasherDI,
);

const DeleteAccountUseCaseDI = new DeleteAccountUseCase(
  VerificationCodeValidatorDI,
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

const CheckVerificationCodeUseCaseDI = new CheckVerificationCodeUseCase(
  VerificationCodeValidatorDI,
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
  checkVerificationCodeUseCase: CheckVerificationCodeUseCaseDI,
});

export const authUseCasesDI = {
  LoginUseCaseDI,
  CreateAccountUseCaseDI,
  DeleteAccountUseCaseDI,
  RefreshTokenUseCaseDI,
  ChangePasswordUseCaseDI,
  ForgotPasswordUseCaseDI,
  SendVerificationCodeUseCaseDI,
  CheckVerificationCodeUseCaseDI,
};