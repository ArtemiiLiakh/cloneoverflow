import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { makeAccessToken } from '@application/services/auth/utils/makeAccessToken';
import { makeRefreshToken } from '@application/services/auth/utils/makeRequestToken';
import { LoginException } from '@cloneoverflow/common';
import { DataHasher } from '@common/encryption/DataHasher';
import { UserRepository } from '@core/repositories/user/UserRepository';
import { LoginInput, LoginOutput } from './dto';
import { ILoginUseCase } from './type';

export class LoginUseCase implements ILoginUseCase {
  constructor (
    private userRepository: UserRepository,
    private dataEncryptor: DataEncryptor,
    private dataHasher: DataHasher,
  ) {}

  async execute ({ email, password }: LoginInput): Promise<LoginOutput> {
    const creds = await this.userRepository.getCreds({ email }).catch(() => {
      throw new LoginException();
    });
    
    const user = await this.userRepository.getByEmail({ email });
    
    if (!await this.dataHasher.compareHash(password, creds.password)) {
      throw new LoginException();
    }

    const [access_token, refresh_token] = await Promise.all([
      makeAccessToken(this.dataEncryptor, {
        userId: user.userId,
        status: user.status,
      }),
      makeRefreshToken(this.dataEncryptor, {
        userId: user.userId,
        status: user.status,
      }),
    ]);
    
    return {
      user,
      tokens: {
        access_token,
        refresh_token,
      },
    };
  }
}