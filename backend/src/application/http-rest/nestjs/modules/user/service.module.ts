import { Module } from '@nestjs/common';
import { UserServiceProvider } from '../../di/providers/services/user/UserServiceProvider';
import {
  UserCreateUseCaseProvider,
  UserGetOwnAnswersUseCaseProvider,
  UserGetOwnQuestionsUseCaseProvider,
  UserGetProfileUseCaseProvider,
  UserGetUseCaseProvider,
  UserUpdateUseCaseProvider,
} from '../../di/providers/services/user/usecases';
import { EncryptionModule } from '../encryption.module';

@Module({
  providers: [
    UserCreateUseCaseProvider,
    UserGetProfileUseCaseProvider,
    UserGetUseCaseProvider,
    UserUpdateUseCaseProvider,
    UserGetOwnAnswersUseCaseProvider,
    UserGetOwnQuestionsUseCaseProvider,

    UserServiceProvider,
  ],
  exports: [
    UserCreateUseCaseProvider,
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