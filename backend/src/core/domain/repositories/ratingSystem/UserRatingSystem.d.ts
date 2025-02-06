import { UserRatingActions } from '@common/enums/UserRatingActions';

export interface UserRatingSystem {
  getMinRating(action: UserRatingActions): Promise<number>,
}