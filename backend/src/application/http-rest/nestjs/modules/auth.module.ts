import { Module } from '@nestjs/common';
import { NestAuthController } from '../controllers/auth.controller';
import { AuthControllerProvider } from '../di/providers/controllers/AuthControllerProvider';
import { AuthServiceProvider } from '../di/providers/services/auth/AuthServiceProvider';
import {
  ChangePasswordUseCaseProvider,
  CheckVerificationCodeUseCaseProvider,
  CreateAccountUseCaseProvider,
  DeleteAccountUseCaseProvider,
  ForgotPasswordUseCaseProvider,
  GetMeUseCaseProvider,
  LoginUseCaseProvider,
  RefreshTokenUseCaseProvider,
  SendVerificationCodeUseCaseProvider,
} from '../di/providers/services/auth/usecases';
import { EncryptionModule } from './encryption.module';
import { EmailModule } from './email.module';
import { UserModule } from './app/user.module';
import { ValidatorModule } from './validator.module';

@Module({
  controllers: [NestAuthController],
  providers: [
    ChangePasswordUseCaseProvider,
    CheckVerificationCodeUseCaseProvider,
    CreateAccountUseCaseProvider,
    DeleteAccountUseCaseProvider,
    ForgotPasswordUseCaseProvider,
    GetMeUseCaseProvider,
    LoginUseCaseProvider,
    RefreshTokenUseCaseProvider,
    SendVerificationCodeUseCaseProvider,
    AuthServiceProvider,
    AuthControllerProvider,
  ],
  exports: [
    AuthServiceProvider,
    ChangePasswordUseCaseProvider,
    CheckVerificationCodeUseCaseProvider,
    CreateAccountUseCaseProvider,
    DeleteAccountUseCaseProvider,
    ForgotPasswordUseCaseProvider,
    GetMeUseCaseProvider,
    LoginUseCaseProvider,
    RefreshTokenUseCaseProvider,
    SendVerificationCodeUseCaseProvider,
  ],
  imports: [
    EncryptionModule, 
    ValidatorModule,
    UserModule,
    EmailModule,
  ],
})
export class AuthModule {}