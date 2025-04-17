import { Module } from '@nestjs/common';
import { AuthServiceProvider } from '../../di/providers/services/auth/AuthServiceProvider';
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
} from '../../di/providers/services/auth/usecases';
import { EmailModule } from '../email.module';
import { EncryptionModule } from '../encryption.module';
import { UserServiceModule } from '../user/service.module';

@Module({
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
  ],
  exports: [
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
  ],
  imports: [
    EncryptionModule, 
    UserServiceModule,
    EmailModule,
  ],
})
export class AuthServiceModule {}