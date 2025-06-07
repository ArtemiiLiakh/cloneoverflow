import { UserRatingSystem } from '@application/ratingSystem/UserRatingSystem';
import { RatingNotHighEnough } from '@core/user/exceptions';
import { UserRepository } from '@core/user/repository/UserRepository';
import { UserRatingValidatorInput } from './dto';
import { IUserRatingValidator } from './type';

export class UserRatingValidator implements IUserRatingValidator {
  constructor (
    private userRatingSystem: UserRatingSystem,
    private userRepository: UserRepository,
  ) {}

  async validate (
    { userId, action }: UserRatingValidatorInput,
  ): Promise<void> {
    const user = await this.userRepository.getById({
      userId,
      select: { rating: true },
    });

    const minRating = await this.userRatingSystem.getMinRating(action);

    if (user.rating < minRating) {
      throw new RatingNotHighEnough();
    }
  }
}