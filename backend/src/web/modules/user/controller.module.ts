import { Module } from '@nestjs/common';
import { NestUserController } from '@web/controllers/user.controller';
import { UserControllerProvider } from '@web/di/providers/controllers/UserControllerProvider';
import { UserServiceModule } from './service.module';

@Module({
  controllers: [NestUserController],
  providers: [UserControllerProvider],
  imports: [UserServiceModule],
})
export class UserControllerModule {}