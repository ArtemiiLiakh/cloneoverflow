import { Module } from '@nestjs/common';
import { NestAuthController } from '@web/controllers/auth.controller';
import { AuthControllerProvider } from '@web/di/providers/controllers/AuthControllerProvider';
import { AuthServiceModule } from './service.module';

@Module({
  controllers: [NestAuthController],
  providers: [AuthControllerProvider],
  imports: [AuthServiceModule],
})
export class AuthControllerModule {}