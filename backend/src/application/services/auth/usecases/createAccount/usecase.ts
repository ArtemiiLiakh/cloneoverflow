import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { makeAccessToken } from '@application/services/auth/utils/makeAccessToken';
import { makeRefreshToken } from '@application/services/auth/utils/makeRequestToken';
import { IUserCreateUseCase } from '@core/services/user/types';
import { CreateAccountInput, CreateAccountOutput } from './dto';
import { ICreateAccountUseCase } from './type';

export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor (
    private dataEncryptor: DataEncryptor,
    private userCreateUseCase: IUserCreateUseCase,
  ) {}

  async execute (
    { email, name, password, username, about }: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    const user = await this.userCreateUseCase.execute({ 
      email, 
      password, 
      name, 
      username, 
      about, 
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