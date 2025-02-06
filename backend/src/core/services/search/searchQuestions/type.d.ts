import { UseCase } from '@common/services/UseCase';
import { SearchQuestionsInput, SearchQuestionsOutput } from './dto';

export interface ISearchQuestionsUseCase extends UseCase<SearchQuestionsInput, SearchQuestionsOutput> {}
