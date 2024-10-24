import { UseCase } from "@common/usecase/UseCase";
import { SearchServiceInput } from "../dto/SearchServiceInput";
import { SearchServiceOutput } from "../dto/SearchServiceOutput";

export interface ISearchQuestionsUseCase extends UseCase<SearchServiceInput.SearchQuestions, SearchServiceOutput.SearchQuestions> {}
export interface ISearchTagsUseCase extends UseCase<SearchServiceInput.SearchTags, SearchServiceOutput.SerachTags> {}