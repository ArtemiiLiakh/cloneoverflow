import { AnswerUserStatusEnum, OrderByEnum, UserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { BasicType } from '@common/repository/Datatypes/BasicType';
import { DateType } from '@common/repository/Datatypes/DateType';
import { NumberType } from '@common/repository/Datatypes/NumberType';
import { StringType } from '@common/repository/Datatypes/StringType';
import { OrderByInput } from '@common/repository/order';
import { SelectInput, SelectOutput } from '@common/repository/select';
import { WhereInput } from '@common/repository/where';
import { Answer } from '@core/models/Answer';

export type AnswerSelectInput = SelectInput<Answer>;
export type AnswerSelectOutput = SelectOutput<Answer>;

export type AnswerOrderByType = {
  text?: OrderByEnum,
  rating?: OrderByEnum,
  isSolution?: OrderByEnum,
  createdAt?: OrderByEnum,
};

export type AnswerOrderBy = OrderByInput<AnswerOrderByType>;

export type AnswerIncludeInput = {
  owner?: true,
  question?: true,
};

export type AnswerIncludeOutput = {
  owner?: {
    id: string,
    name: string,
    username: string,
    rating: number,
    status: UserStatusEnum,
  },
  question?: {
    id: string,
    ownerId: string,
    title: string,
    rating: number,
    isClosed: boolean,
  },
}

export type AnswerWhere = WhereInput<{
  answerId?: BasicType<string>,
  ownerId?: BasicType<string>,
  questionId?: BasicType<string>,
  text?: StringType,
  rating?: NumberType,
  isSolution?: boolean,
  createdAt?: DateType,
  question?: {
    questionId?: BasicType<string>,
    title?: StringType,
  },
}>;

export type AnswerUserWhere = WhereInput<{
  id?: string,
  userId?: string,
  answerId?: string,
  status?: AnswerUserStatusEnum,
  voteType?: VoteTypeEnum,
}>;