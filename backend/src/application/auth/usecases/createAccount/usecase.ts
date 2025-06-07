import { AlreadyRegisteredException } from '@application/auth/exceptions/AlreadyRegistered';
import { makeAccessToken } from '@application/auth/utils/makeAccessToken';
import { makeRefreshToken } from '@application/auth/utils/makeRequestToken';
import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { DataHasher } from '@common/encryption/DataHasher';
import { UserRepository } from '@core/user/repository/UserRepository';
import { CreateAccountInput, CreateAccountOutput } from './dto';
import { ICreateAccountUseCase } from './type';

export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor (
    private dataEncryptor: DataEncryptor,
    private dataHasher: DataHasher,
    private userRepository: UserRepository,
  ) {}

  async execute (
    { email, name, password, username, about }: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    const isUserExists = await this.userRepository.isExist({
      email,
      username,
    });
    
    if (isUserExists) {
      throw new AlreadyRegisteredException();
    }
  
    const user = await this.userRepository.create({
      creds: {
        email,
        password: await this.dataHasher.hash(password),
      },
      user: {
        name,
        username,
        about,
      },
    });
  
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