import { ChangePasswordUseCase } from '@application/auth/usecases/changePassword';
import { DeleteAccountUseCase } from '@application/auth/usecases/deleteAccount';
import { ForgotPasswordUseCase } from '@application/auth/usecases/forgotPassword';
import { LoginUseCase } from '@application/auth/usecases/login';
import { RefreshTokenUseCase } from '@application/auth/usecases/refreshToken';
import { SendVerificationCodeUseCase } from '@application/auth/usecases/sendVerificationCode';
import { SignUpUseCase } from '@application/auth/usecases/signup';
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

const SignUpUseCaseDI = new SignUpUseCase(
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

const SendVerificationCodeDI = new SendVerificationCodeUseCase(
  PrismaUserRepositoryDI, 
  GoogleEmailProviderDI, 
  RedisCacheRepositoryDI, 
  DataHasherDI,
);

export const authServiceFacadeDI = AuthServiceFacade.new({
  loginUseCase: LoginUseCaseDI,
  signUpUseCase: SignUpUseCaseDI,
  getUserUseCase: userUseCasesDI.GetUseCaseDI,
  deleteAccountUseCase: DeleteAccountUseCaseDI,
  refreshTokenUseCase: RefreshTokenUseCaseDI,
  changePasswordUseCase: ChangePasswordUseCaseDI,
  forgotPasswordUseCase: ForgotPasswordUseCaseDI,
  sendVerificationCodeUseCase: SendVerificationCodeDI,
});

export const authUseCasesDI = {
  LoginUseCaseDI,
  SignUpUseCaseDI,
  DeleteAccountUseCaseDI,
  RefreshTokenUseCaseDI,
  ChangePasswordUseCaseDI,
  ForgotPasswordUseCaseDI,
  SendVerificationCodeDI,
};