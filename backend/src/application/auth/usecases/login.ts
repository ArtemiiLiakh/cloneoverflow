import { DataEncryptor } from '@application/interfaces/security/DataEncryptor';
import { DataHasher } from '@core/data/DataHasher';
import { LoginException } from '@cloneoverflow/common';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { AuthServiceInput } from '../dtos/AuthServiceInput';
import { AuthServiceOutput } from '../dtos/AuthServiceOutput';
import { ILoginUseCase } from '../types/usecases';
import { makeAccessToken } from './utils/makeAccessToken';
import { makeRefreshToken } from './utils/makeRequestToken';

export class LoginUseCase implements ILoginUseCase {
  constructor (
    private userRepository: UserRepository,
    private dataEncryptor: DataEncryptor,
    private dataHasher: DataHasher,
  ) {}

  async execute ({ email, password }: AuthServiceInput.Login): Promise<AuthServiceOutput.Login> {
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