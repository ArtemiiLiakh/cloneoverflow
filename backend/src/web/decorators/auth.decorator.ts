import { TokenTypeEnum } from '@application/auth/data';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { JwtGuard } from '../guards/jwt.guard';

interface AuthPayload {
  tokenType?: TokenTypeEnum,
  optional?: boolean;
}

export const Auth = (payload?: AuthPayload): MethodDecorator => {
  return applyDecorators(
    SetMetadata('tokenType', payload?.tokenType),
    SetMetadata('optional', payload?.optional),
    UseGuards(JwtGuard, AuthGuard),
  );
};