import { TokenTypeEnum } from '@application/services/auth/data';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { JwtGuard } from '../guards/jwt.guard';

interface AuthPayload {
  tokenType?: TokenTypeEnum,
  optinoal?: boolean;
}

export const Auth = (payload?: AuthPayload): MethodDecorator => {
  return applyDecorators(
    SetMetadata('tokenType', payload?.tokenType),
    SetMetadata('optional', payload?.optinoal),
    UseGuards(JwtGuard, AuthGuard),
  );
};