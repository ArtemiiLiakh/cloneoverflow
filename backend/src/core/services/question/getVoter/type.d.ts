import { UseCase } from '@common/services/UseCase';
import { QuestionGetVoterInput, QuestionGetVoterOutput } from './dto';

export interface IQuestionGetVoterUseCase extends UseCase<QuestionGetVoterInput, QuestionGetVoterOutput> {}