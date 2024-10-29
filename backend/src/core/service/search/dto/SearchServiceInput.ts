import { 
  SearchTagsSortByEnum, 
  OrderByEnum, 
  PaginationInput, 
  SearchQuestionFilterByEnum, 
  SearchQuestionSortByEnum 
} from "@cloneoverflow/common";

export namespace SearchServiceInput {
  export type SearchTags = {
    name?: string;
    sortBy?: SearchTagsSortByEnum;
    orderBy?: OrderByEnum;
    pagination?: PaginationInput;
  };

  export type SearchQuestions = {
    search?: string;
    filterBy?: SearchQuestionFilterByEnum | SearchQuestionFilterByEnum[];
    sortBy?: SearchQuestionSortByEnum | SearchQuestionSortByEnum[];
    orderBy?: OrderByEnum;
    pagination?: PaginationInput;
  };
}