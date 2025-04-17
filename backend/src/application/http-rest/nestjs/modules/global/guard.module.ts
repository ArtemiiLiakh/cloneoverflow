import { Global, Module } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { JwtGuard } from '../../guards/jwt.guard';

@Global()
@Module({
  providers: [JwtGuard, AuthGuard],
  exports: [AuthGuard],
})
export class GuardModule {}