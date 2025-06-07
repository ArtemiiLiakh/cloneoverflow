import { UseCase } from '@common/services/UseCase';
import { UserGetOwnQuestionsInput, UserGetOwnQuestionsOutput } from './dto';

export interface IUserGetOwnQuestionsUseCase extends UseCase<UserGetOwnQuestionsInput, UserGetOwnQuestionsOutput> {}