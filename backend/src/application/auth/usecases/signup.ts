import { DataEncryptor } from '@application/interfaces/security/DataEncryptor';
import { IUserCreateUseCase } from '@core/services/user/types/usecases';
import { AuthServiceInput } from '../dtos/AuthServiceInput';
import { AuthServiceOutput } from '../dtos/AuthServiceOutput';
import { ISignUpUseCase } from '../types/usecases';
import { makeAccessToken } from './utils/makeAccessToken';
import { makeRefreshToken } from './utils/makeRequestToken';

export class SignUpUseCase implements ISignUpUseCase {
  constructor (
    private dataEncryptor: DataEncryptor,
    private userCreateUseCase: IUserCreateUseCase,
  ) {}

  async execute ({ email, name, password, username, about }: AuthServiceInput.SignUp): Promise<AuthServiceOutput.SignUp> {
    const user = await this.userCreateUseCase.execute({ 
      email, 
      password, 
      name, 
      username, 
      about, 
    });
  
    const [access_token, refresh_token] = await Promise.all([
      makeAccessToken(this.dataEncryptor, {
        userId: user.id,
        status: user.status,
      }), 
      makeRefreshToken(this.dataEncryptor, {
        userId: user.id,
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