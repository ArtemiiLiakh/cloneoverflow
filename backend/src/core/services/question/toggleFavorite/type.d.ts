import { UseCase } from '@common/services/UseCase';
import { QuestionToggleFavoriteInput, QuestionToggleFavoriteOutput } from './dto';

export interface IQuestionToggleFavoriteUseCase extends UseCase<QuestionToggleFavoriteInput, QuestionToggleFavoriteOutput> {}