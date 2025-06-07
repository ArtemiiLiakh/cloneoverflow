import { AuthUserValidator } from '@application/validators';
import { UserRepository } from '@core/user/repository/UserRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { ValidatorDITokens } from '@web/di/tokens/ValidatorDITokens';

export const UserValidatorProvider: Provider = {
  provide: ValidatorDITokens.UserValidator,
  useFactory: (userRepository: UserRepository) => new AuthUserValidator(userRepository),
  inject: [PrismaRepositoryDITokens.UserRepository],
};