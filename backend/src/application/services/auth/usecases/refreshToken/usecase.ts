import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { UserRepository } from '@core/repositories/user/UserRepository';
import { makeAccessToken } from '../../utils/makeAccessToken';
import { RefreshTokenInput, RefreshTokenOutput } from './dto';
import { IRefreshTokenUseCase } from './type';

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor (
    private dataEncryptor: DataEncryptor,
    private userRepository: UserRepository,
  ) {}

  async execute ({ userId }: RefreshTokenInput): Promise<RefreshTokenOutput> {
    const user = await this.userRepository.getById({ userId });

    return {
      access_token: await makeAccessToken(this.dataEncryptor, {
        userId: user.userId,
        status: user.status,
      }),
    };
  }
}