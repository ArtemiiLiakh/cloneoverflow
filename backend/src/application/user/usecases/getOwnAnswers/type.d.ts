import { UseCase } from '@common/services/UseCase';
import { UserGetOwnAnswersInput, UserGetOwnAnswersOutput } from './dto';

export interface IUserGetOwnAnswersUseCase extends UseCase<UserGetOwnAnswersInput, UserGetOwnAnswersOutput> {}