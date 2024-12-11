import { 
  SearchTagsSortByEnum, 
  OrderByEnum, 
  SearchQuestionFilterByEnum, 
  SearchQuestionSortByEnum,
  PaginationDTO, 
} from '@cloneoverflow/common';

export namespace SearchServiceInput {
  export type SearchTags = {
    name?: string;
    sortBy?: SearchTagsSortByEnum;
    orderBy?: OrderByEnum;
    pagination?: PaginationDTO;
  };

  export type SearchQuestions = {
    search?: string;
    filterBy?: SearchQuestionFilterByEnum | SearchQuestionFilterByEnum[];
    sortBy?: SearchQuestionSortByEnum | SearchQuestionSortByEnum[];
    orderBy?: OrderByEnum;
    pagination?: PaginationDTO;
  };
}