import {
  AnswerUserStatusEnum,
  OrderByEnum,
  QuestionUserStatusEnum,
  UserStatusEnum,
  VoteTypeEnum,
} from '@cloneoverflow/common';
import { BasicType } from '@common/repository/Datatypes/BasicType';
import { DateType } from '@common/repository/Datatypes/DateType';
import { NumberType } from '@common/repository/Datatypes/NumberType';
import { StringType } from '@common/repository/Datatypes/StringType';
import { OrderByInput } from '@common/repository/order';
import { SelectInput, SelectOutput } from '@common/repository/select';
import { WhereInput } from '@common/repository/where';
import { User } from '@core/domain/entities/User';

export type UserSelectInput = SelectInput<User>;
export type UserSelectOutput = SelectOutput<User>;

export type UserCountsInput = {
  questions?: true,
  answers?: true,
};

export type UserCountsOutput = {
  questions: number,
  answers: number,
};

export type UserOrderByType = {
  name?: OrderByEnum,
  username?: OrderByEnum,
  rating?: OrderByEnum,
  status?: OrderByEnum,
  createdAt?: OrderByEnum,
  questionsAmount?: OrderByEnum,
  answersAmount?: OrderByEnum,
};

export type UserOrderBy = OrderByInput<UserOrderByType>;

export type UserIncludeInput = {
  questions?: true,
  answers?: true,
};

export type UserIncludeOutput = {
  questions?: {
    id: string,
    ownerId: string,
    title: string,
    rating: number,
    views: number,
    isClosed: boolean,
    createdAt: Date,
    updatedAt: Date,
  }[],
  
  answers?: {
    id: string,
    ownerId: string,
    questionId: string,
    rating: number,
    isSolution: boolean,
    createdAt: Date,
    updatedAt: Date,
  }[],
}

export type UserWhere = WhereInput<{
  userId?: BasicType<string>,
  email?: StringType,
  name?: StringType,
  username?: StringType,
  rating?: NumberType,
  status?: BasicType<UserStatusEnum>,
  about?: StringType,
  createdAt?: DateType,
  updatedAt?: DateType,
  userQuestions?: {
    userId?: BasicType<string>,
    questionId?: BasicType<string>,
    status?: BasicType<QuestionUserStatusEnum>,
    voteType?: BasicType<VoteTypeEnum>,
  },
  userAnswers?: {
    userId?: BasicType<string>,
    answerId?: BasicType<string>,
    status?: BasicType<AnswerUserStatusEnum>,
    voteType?: VoteTypeEnum,
  };
}>;