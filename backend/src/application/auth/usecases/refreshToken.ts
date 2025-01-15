import { DataEncryptor } from '@application/interfaces/security/DataEncryptor';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { AuthServiceInput } from '../dtos/AuthServiceInput';
import { AuthServiceOutput } from '../dtos/AuthServiceOutput';
import { IRefreshTokenUseCase } from '../types/usecases';
import { makeAccessToken } from './utils/makeAccessToken';
import { UnauthorizedException } from '@cloneoverflow/common';

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor (
    private dataEncryptor: DataEncryptor,
    private userRepository: UserRepository,
  ) {}

  async execute ({ userId }: AuthServiceInput.RefreshToken): Promise<AuthServiceOutput.RefreshToken> {
    const user = await this.userRepository.getById({ userId })
      .catch(() => { 
        throw new UnauthorizedException(); 
      });

    return {
      access_token: await makeAccessToken(this.dataEncryptor, {
        userId: user.id,
        status: user.status,
      }),
    };
  }
}