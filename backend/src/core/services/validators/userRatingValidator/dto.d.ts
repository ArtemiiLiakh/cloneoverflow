import { UserRatingActions } from '@common/enums/UserRatingActions';

export type UserRatingValidatorInput = {
  userId: string,
  action: UserRatingActions,
}