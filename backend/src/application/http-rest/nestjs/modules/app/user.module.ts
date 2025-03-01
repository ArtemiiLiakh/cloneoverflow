import { Module } from '@nestjs/common';
import { NestUserController } from '../../controllers/user.controller';
import { UserControllerProvider } from '../../di/providers/controllers/UserControllerProvider';
import { UserServiceProvider } from '../../di/providers/services/user/UserServiceProvider';
import {
  UserCreateUseCaseProvider,
  UserGetProfileUseCaseProvider,
  UserGetUseCaseProvider,
  UserUpdateUseCaseProvider,
} from '../../di/providers/services/user/usecases';
import { EncryptionModule } from '../encryption.module';
import { ValidatorModule } from '../validator.module';

@Module({
  controllers: [NestUserController],
  providers: [
    UserCreateUseCaseProvider,
    UserGetProfileUseCaseProvider,
    UserGetUseCaseProvider,
    UserUpdateUseCaseProvider,
    
    UserServiceProvider,
    UserControllerProvider,
  ],
  exports: [
    UserServiceProvider,
    UserCreateUseCaseProvider,
    UserGetProfileUseCaseProvider,
    UserGetUseCaseProvider,
    UserUpdateUseCaseProvider,
  ],
  imports: [
    ValidatorModule, 
    EncryptionModule,
  ],
})
export class UserModule {}