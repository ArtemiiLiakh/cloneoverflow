import { DataEncryptorDITokens } from '@application/http-rest/nestjs/di/tokens/encryption';
import { AuthUseCaseDITokens, UserUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { DataEncryptor } from '@common/encryption/DataEncryptor';
import { CreateAccountUseCase } from '@application/services/auth/usecases';
import { IUserCreateUseCase } from '@core/services/user/types';
import { Provider } from '@nestjs/common';

export const CreateAccountUseCaseProvider: Provider = {
  provide: AuthUseCaseDITokens.CreateAccount,
  
  useFactory: (
    dataEncryptor: DataEncryptor,
    userCreateUseCase: IUserCreateUseCase,
  ) => new CreateAccountUseCase(
    dataEncryptor,
    userCreateUseCase,
  ),
  
  inject: [
    DataEncryptorDITokens.JwtEncryptor,
    UserUseCaseDITokens.Create,
  ],
};