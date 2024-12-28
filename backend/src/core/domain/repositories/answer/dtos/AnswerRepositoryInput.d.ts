import { PaginationDTO, VoteTypeEnum } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { AnswerIncludeInput, AnswerOrderBy, AnswerSelectInput, AnswerWhereInput } from './Params';

export namespace AnswerRepositoryInput {
  export type GetById = { answerId: string };

  export type GetAnswer = { 
    where: AnswerWhereInput,
    orderBy?: AnswerOrderBy,
    include?: AnswerIncludeInput,
  };
  
  export type GetPartialAnswer = {
    where: AnswerWhereInput,
    select?: AnswerSelectInput,
    orderBy?: AnswerOrderBy,
    include?: AnswerIncludeInput,
  };
  
  export type GetPartialById = {
    answerId: string,
    select: AnswerSelectInput,
  };
  
  export type GetMany = {
    where: AnswerWhereInput,
    select?: AnswerSelectInput,
    orderBy?: AnswerOrderBy,
    include?: AnswerIncludeInput,
    pagination?: PaginationDTO,
  };

  export type IsExist = {
    answerId: string;
  }

  export type Count = {
    where: AnswerWhereInput,
  }

  export type Create = {
    answer: Answer
  };

  export type Update = {
    answerId: string, 
    answer: {
      text?: string,
    },
    returnEntity?: boolean;
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