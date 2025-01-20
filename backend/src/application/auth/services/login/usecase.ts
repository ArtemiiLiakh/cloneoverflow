import { makeAccessToken } from '@application/auth/utils/makeAccessToken';
import { makeRefreshToken } from '@application/auth/utils/makeRequestToken';
import { DataEncryptor } from '@application/interfaces/security/DataEncryptor';
import { LoginException } from '@cloneoverflow/common';
import { DataHasher } from '@core/data/DataHasher';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { LoginInput, LoginOutput } from './dto';
import { ILoginUseCase } from './type';

export class LoginUseCase implements ILoginUseCase {
  constructor (
    private userRepository: UserRepository,
    private dataEncryptor: DataEncryptor,
    private dataHasher: DataHasher,
  ) {}

  async execute ({ email, password }: LoginInput): Promise<LoginOutput> {
    const creds = await this.userRepository.getCreds({ 
      where: { email },
      withUser: true,
    });
    
    if (!creds) {
      throw new LoginException();
    }
    
    if (!await this.dataHasher.compareHash(password, creds.creds.password)) {
      throw new LoginException();
    }

    const [access_token, refresh_token] = await Promise.all([
      makeAccessToken(this.dataEncryptor, {
        userId: creds.user!.id,
        status: creds.user!.status,
      }),
      makeRefreshToken(this.dataEncryptor, {
        userId: creds.user!.id,
        status: creds.user!.status,
      }),
    ]);
    
    return {
      user: creds.user!,
      tokens: {
        access_token,
        refresh_token,
      },
    };
  }
}