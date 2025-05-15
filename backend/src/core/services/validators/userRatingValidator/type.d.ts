import { ValidatorUseCase } from '@common/services/Validator';
import { UserRatingValidatorInput, UserRatingValidatorOutput } from './dto';

export interface IUserRatingValidator extends ValidatorUseCase<UserRatingValidatorInput, UserRatingValidatorOutput> {}