import { Global, Module } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { JwtGuard } from '../guards/jwt.guard';
import { ValidatorModule } from './validator.module';

@Global()
@Module({
  providers: [JwtGuard, AuthGuard],
  exports: [AuthGuard],
  imports: [ValidatorModule],
})
export class GuardModule {}