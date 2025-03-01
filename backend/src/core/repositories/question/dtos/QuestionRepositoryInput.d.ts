import { PaginationDTO, VoteTypeEnum } from '@cloneoverflow/common';
import { Question } from '@core/models/Question';
import { Tag } from '@core/models/Tag';
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

  export type IsExist = QuestionWhere;

  export type Count = {
    where: QuestionWhere;
  };

  export type Create = {
    question: Question;
    returnId?: true,
  };
  
  export type Update = {
    questionId: string;
    question: {
      title?: string,
      text?: string,
    };
    returnEntity?: true;
  };

  export type AddViewer = {
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