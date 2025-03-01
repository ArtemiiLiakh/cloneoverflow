import { Provider } from '@nestjs/common';
import { ValidatorDITokens } from '../../tokens/ValidatorDITokens';
import { AuthUserValidator } from '@application/services/validators';
import { UserRepository } from '@core/repositories';
import { PrismaRepositoryDITokens } from '../../tokens/persistence/RepositoryDITokens';

export const AuthUserValidatorProvider: Provider = {
  provide: ValidatorDITokens.AuthUserValidator,
  useFactory: (userRepository: UserRepository) => new AuthUserValidator(userRepository),
  inject: [PrismaRepositoryDITokens.UserRepository],
};