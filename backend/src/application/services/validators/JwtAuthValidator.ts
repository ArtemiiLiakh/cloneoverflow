import { ExecutorPayload, TokenPayload, TokenTypeEnum } from '@application/services/auth/data';
import { UnauthorizedException } from '@cloneoverflow/common';
import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { ValidatorUseCase } from '@common/services/Validator';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

interface JwtPayload {
  token: string,
  tokenType: TokenTypeEnum,
}

export class JwtAuthValidator implements ValidatorUseCase<JwtPayload, ExecutorPayload> {
  constructor (
    private jwtEncryptor: DataEncryptor,
  ) {}

  async validate ({ token, tokenType }: JwtPayload): Promise<ExecutorPayload> {
    const decode = await this.jwtEncryptor.decrypt(token).catch(() => { 
      throw new UnauthorizedException('Authorization token is wrong'); 
    });
    
    const payload = plainToInstance(TokenPayload, decode);
    
    if ((await validate(payload)).length) {
      throw new UnauthorizedException('Authorization token is wrong');
    }

    if (payload.type !== tokenType) {
      throw new UnauthorizedException('Authorization token type is wrong');
    }

    return {
      userId: payload.userId,
      status: payload.status,
    };
  }
}