import { PaginationDTO, VoteTypeEnum } from '@cloneoverflow/common';
import { Answer } from '@core/models/Answer';
import { AnswerIncludeInput, AnswerOrderBy, AnswerSelectInput, AnswerWhere } from './Params';

export namespace AnswerRepositoryInput {
  export type GetById = { answerId: string };

  export type GetAnswer = { 
    where: AnswerWhere,
    orderBy?: AnswerOrderBy,
    include?: AnswerIncludeInput,
  };
  
  export type GetPartialAnswer = {
    where: AnswerWhere,
    select?: AnswerSelectInput,
    orderBy?: AnswerOrderBy,
    include?: AnswerIncludeInput,
  };
  
  export type GetPartialById = {
    answerId: string,
    select: AnswerSelectInput,
  };
  
  export type GetMany = {
    where: AnswerWhere,
    select?: AnswerSelectInput,
    orderBy?: AnswerOrderBy,
    include?: AnswerIncludeInput,
    pagination?: PaginationDTO,
  };

  export type IsExist = AnswerWhere;

  export type Count = {
    where: AnswerWhere,
  }

  export type Create = {
    answer: Answer,
    returnId?: true,
  };

  export type Update = {
    answerId: string, 
    answer: {
      text?: string,
    },
    returnEntity?: true;
  };

  export type Delete = {
    answerId: string,
  };

  export type MarkSolution = {
    answerId: string, 
  };

  export type UnmarkSolution = {
    answerId: string, 
  };

  export type AddRating = {
    answerId: string,
    voteType: VoteTypeEnum,
  };
}