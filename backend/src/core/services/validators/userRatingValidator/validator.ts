import { UserRepository } from '@core/domain/repositories';
import { UserRatingValidatorInput, UserRatingValidatorOutput } from './dto';
import { IUserRatingValidator } from './type';
import { ForbiddenException } from '@cloneoverflow/common';
import { UserRatingSystem } from '@core/domain/repositories/ratingSystem/UserRatingSystem';

export class UserRatingValidator implements IUserRatingValidator {
  constructor (
    private userRatingSystem: UserRatingSystem,
    private userRepository: UserRepository,
  ) {}

  async validate (
    { userId, action }: UserRatingValidatorInput,
  ): Promise<UserRatingValidatorOutput> {
    const user = await this.userRepository.getPartialById({
      userId,
      select: { rating: true },
    });

    const minRating = await this.userRatingSystem.getMinRating(action);

    if (user.rating! < minRating) {
      throw new ForbiddenException('Your rating is not high enough to perform this action');
    }
  }
}