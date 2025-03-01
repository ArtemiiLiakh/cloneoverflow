import { UserRepository } from '@core/repositories';
import { UserRatingValidatorInput } from './dto';
import { IUserRatingValidator } from './type';
import { ForbiddenException } from '@cloneoverflow/common';
import { UserRatingSystem } from '@core/repositories/ratingSystem/UserRatingSystem';

export class UserRatingValidator implements IUserRatingValidator {
  constructor (
    private userRatingSystem: UserRatingSystem,
    private userRepository: UserRepository,
  ) {}

  async validate (
    { userId, action }: UserRatingValidatorInput,
  ): Promise<void> {
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