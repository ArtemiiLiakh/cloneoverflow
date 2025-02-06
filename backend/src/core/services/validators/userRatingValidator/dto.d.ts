import { UserRatingActions } from '@common/enums/UserRatingActions';

export type UserRatingValidatorInput = {
  userId: string,
  action: UserRatingActions,
}

export type UserRatingValidatorOutput = void;