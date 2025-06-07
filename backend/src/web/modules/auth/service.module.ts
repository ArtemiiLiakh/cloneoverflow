import { Module } from '@nestjs/common';
import { AuthServiceProvider } from '../../di/providers/services/auth/AuthServiceProvider';
import { EmailModule } from '../email.module';
import { EncryptionModule } from '../encryption.module';
import { UserServiceModule } from '../user/service.module';

import { 
  ChangePasswordUseCaseProvider,
  CreateAccountUseCaseProvider, 
  DeleteAccountUseCaseProvider, 
  ForgotPasswordUseCaseProvider, 
  GetMeUseCaseProvider, 
  LoginUseCaseProvider, 
  RefreshTokenUseCaseProvider, 
  SendVerificationCodeUseCaseProvider,
} from '@web/di/providers/services/auth/usecases';

@Module({
  providers: [
    ChangePasswordUseCaseProvider,
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