import { UseCase } from '@common/usecase/UseCase';
import { QuestionGetVoterInput, QuestionGetVoterOutput } from './dto';

export interface IQuestionGetVoterUseCase extends UseCase<QuestionGetVoterInput, QuestionGetVoterOutput> {}