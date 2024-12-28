import { PaginationDTO, VoteTypeEnum } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { Tag } from '@core/domain/entities/Tag';
import { QuestionCountInput, QuestionIncludeInput, QuestionOrderBy, QuestionSelectInput, QuestionWhere } from './Params';

export namespace QuestionRepositoryInput {
  export type GetById = { questionId: string };

  export type GetQuestion = {
    where: QuestionWhere;
    counts?: QuestionCountInput;
    orderBy?: QuestionOrderBy,
    include?: QuestionIncludeInput,
  };
  
  export type GetPartialQuestion = {
    where: QuestionWhere;
    select: QuestionSelectInput;
    counts?: QuestionCountInput;
    orderBy?: QuestionOrderBy,
    include?: QuestionIncludeInput,
  };

  export type GetPartialById = {
    questionId: string,
    select: QuestionSelectInput;
  };
  
  export type GetMany = {
    where: QuestionWhere;
    select?: QuestionSelectInput,
    orderBy?: QuestionOrderBy,
    counts?: QuestionCountInput,
    include?: QuestionIncludeInput,
    pagination?: PaginationDTO,
  };

  export type IsExist = {
    questionId: string;
  }

  export type Count = {
    where: QuestionWhere;
  };

  export type Create = {
    question: Question;
  };
  
  export type Update = {
    questionId: string;
    question: {
      title?: string,
      text?: string,
    };
    returnEntity?: boolean;
  };

  export type AddViewer = {
    userId: string;
    questionId: string;
  };
  
  export type AddRating = {
    questionId: string;
    voteType: VoteTypeEnum,
  };
  
  export type Delete = {
    questionId: string;
  };
  
  export type RefTags = {
    questionId: string;
    tags: Tag[];
  };

  export type UnrefTags = {
    questionId: string;
  };
  
  export type CloseQuestion = {
    questionId: string;
    answerId: string;
  };
  
  export type OpenQuestion = {
    questionId: string;
  };
}