import { SearchQuestionsDTO, SearchTagsDTO } from "@cloneoverflow/common";

export namespace SearchServiceInput {
  export type SearchTags = SearchTagsDTO;
  export type SearchQuestions = SearchQuestionsDTO;
}