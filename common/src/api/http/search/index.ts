import { SearchQuestionsPath } from './SearchQuestionsDTO';
import { SearchTagsPath } from './SearchTagsDTO';

export * from './SearchQuestionsDTO';
export * from './SearchTagsDTO';

export const SearchPaths = {
  SearchQuestions: SearchQuestionsPath,
  SearchTags: SearchTagsPath,
}