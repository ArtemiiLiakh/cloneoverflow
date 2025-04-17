import { Module } from '@nestjs/common';
import { NestUserController } from '../../controllers/user.controller';
import { UserControllerProvider } from '../../di/providers/controllers/UserControllerProvider';
import { UserServiceModule } from './service.module';

@Module({
  controllers: [NestUserController],
  providers: [UserControllerProvider],
  imports: [UserServiceModule],
})
export class UserControllerModule {}