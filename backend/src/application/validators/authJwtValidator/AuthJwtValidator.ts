import { ExecutorPayload, TokenPayload } from '@application/auth/data';
import { UnauthorizedException } from '@cloneoverflow/common';
import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { JwtPayload } from './dto';
import { JwtValidator } from './type';

export class AuthJwtValidator implements JwtValidator {
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