import { OrderByEnum, UserStatusEnum } from '@cloneoverflow/common';
import { BasicType } from '@common/repository/Datatypes/BasicType';
import { DateType } from '@common/repository/Datatypes/DateType';
import { NumberType } from '@common/repository/Datatypes/NumberType';
import { StringType } from '@common/repository/Datatypes/StringType';
import { OrderByInput } from '@common/repository/order';
import { SelectInput, SelectOutput } from '@common/repository/select';
import { WhereInput } from '@common/repository/where';
import { Question } from '@core/domain/entities/Question';
import { QuestionUser } from '@core/domain/entities/QuestionUser';

export type QuestionSelectInput = SelectInput<Question>;
export type QuestionSelectOutput = SelectOutput<Question>;

export type QuestionCountInput = {
  answers?: true,
  tags?: true,
};

export type QuestionCountOutput = {
  answers: number,
  tags: number,
};

export type QuestionOrderByType = {
  title?: OrderByEnum,
  text?: OrderByEnum,
  rating?: OrderByEnum,
  views?: OrderByEnum,
  isClosed?: OrderByEnum,
  createdAt?: OrderByEnum,
  answersAmount?: OrderByEnum,
};

export type QuestionIncludeInput = {
  owner?: true,
  answers?: true,
  tags?: true,
};

export type QuestionIncludeOutput = {
  owner?: {
    id: string,
    name: string,
    username: string,
    rating: number,
    status: UserStatusEnum,
  },
  
  answers?: {
    id: string,
    ownerId: string,
    questionId: string,
    rating: number,
    isSolution: boolean,
    createdAt: Date,
  }[],

  tags?: {
    id: string,
    name: string,
  }[]
};

export type QuestionOrderBy = OrderByInput<QuestionOrderByType>;

export type QuestionWhere = WhereInput<{
  id?: BasicType<string>,
  ownerId?: BasicType<string>,
  title?: StringType,
  text?: StringType,
  rating?: NumberType,
  views?: NumberType,
  isClosed?: boolean,
  createdAt?: DateType,
  owner?: {
    id?: BasicType<string>,
    username?: StringType,
    name?: StringType
  },
  tags?: {
    id?: BasicType<string>,
    name?: StringType,
  }
}>;

export type QuestionUserWhere = Partial<QuestionUser>;