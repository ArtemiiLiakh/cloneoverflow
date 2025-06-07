import { Global, Module } from '@nestjs/common';
import { AuthGuard } from '@web/guards/auth.guard';
import { JwtGuard } from '@web/guards/jwt.guard';

@Global()
@Module({
  providers: [JwtGuard, AuthGuard],
  exports: [AuthGuard],
})
export class GuardModule {}