import { UserRatingSystem } from '@application/ratingSystem/UserRatingSystem';
import { UserRatingValidator } from '@application/validators';
import { UserRepository } from '@core/user/repository/UserRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens, UserRatingSystemDITokens } from '@web/di/tokens/persistence';
import { ValidatorDITokens } from '@web/di/tokens/ValidatorDITokens';

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