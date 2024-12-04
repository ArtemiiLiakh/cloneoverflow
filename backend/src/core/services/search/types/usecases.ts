import { UseCase } from '@common/usecase/UseCase';
import { SearchServiceInput } from '../dtos/SearchServiceInput';
import { SearchServiceOutput } from '../dtos/SearchServiceOutput';

export interface ISearchQuestionsUseCase extends UseCase<SearchServiceInput.SearchQuestions, SearchServiceOutput.SearchQuestions> {}
export interface ISearchTagsUseCase extends UseCase<SearchServiceInput.SearchTags, SearchServiceOutput.SerachTags> {}