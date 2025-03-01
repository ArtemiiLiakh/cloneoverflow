import { UserRepository } from '@core/repositories';
import { UserRatingSystem } from '@core/repositories/ratingSystem/UserRatingSystem';
import { UserRatingValidator } from '@core/services/validators';
import { Provider } from '@nestjs/common';
import { UserRatingSystemDITokens } from '../../tokens/persistence';
import { PrismaRepositoryDITokens } from '../../tokens/persistence/RepositoryDITokens';
import { ValidatorDITokens } from '../../tokens/ValidatorDITokens';

export const UserRatingValidatorProvider: Provider = {
  provide: ValidatorDITokens.UserRatingValidator,

  useFactory: (
    userRatingSystem: UserRatingSystem, 
    userRepository: UserRepository,
  ) => new UserRatingValidator(userRatingSystem, userRepository),
  
  inject: [
    UserRatingSystemDITokens.JSONUserRatingSystemDIToken, 
    PrismaRepositoryDITokens.UserRepository,
  ],
};