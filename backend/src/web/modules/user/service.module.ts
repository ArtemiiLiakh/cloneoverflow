import { Module } from '@nestjs/common';
import { UserServiceProvider } from '@web/di/providers/services/user/UserServiceProvider';
import { EncryptionModule } from '../encryption.module';

import { 
  UserGetOwnAnswersUseCaseProvider, 
  UserGetOwnQuestionsUseCaseProvider, 
  UserGetProfileUseCaseProvider, 
  UserGetUseCaseProvider, 
  UserUpdateUseCaseProvider,
} from '@web/di/providers/services/user/usecases';

@Module({
  providers: [
    UserGetProfileUseCaseProvider,
    UserGetUseCaseProvider,
    UserUpdateUseCaseProvider,
    UserGetOwnAnswersUseCaseProvider,
    UserGetOwnQuestionsUseCaseProvider,

    UserServiceProvider,
  ],
  exports: [
    UserGetProfileUseCaseProvider,
    UserGetUseCaseProvider,
    UserUpdateUseCaseProvider,
    UserGetOwnAnswersUseCaseProvider,
    UserGetOwnQuestionsUseCaseProvider,
    
    UserServiceProvider,
  ],
  imports: [
    EncryptionModule,
  ],
})
export class UserServiceModule {}