import { TokenTypeEnum } from '@application/services/auth/data';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { JwtGuard } from '../guards/jwt.guard';

interface AuthPayload {
  tokenType?: TokenTypeEnum,
}

export const Auth = (payload?: AuthPayload) => {
  return applyDecorators(
    SetMetadata('tokenType', payload?.tokenType),
    UseGuards(JwtGuard, AuthGuard),
  );
};