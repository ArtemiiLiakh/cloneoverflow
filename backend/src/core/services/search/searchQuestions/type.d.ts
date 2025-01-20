import { UseCase } from '@common/usecase/UseCase';
import { SearchQuestionsInput, SearchQuestionsOutput } from './dto';

export interface ISearchQuestionsUseCase extends UseCase<SearchQuestionsInput, SearchQuestionsOutput> {}
