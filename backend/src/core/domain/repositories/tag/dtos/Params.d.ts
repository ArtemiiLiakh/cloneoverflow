import { OrderByEnum } from '@cloneoverflow/common';
import { BasicType } from '@common/repository/Datatypes/BasicType';
import { StringType } from '@common/repository/Datatypes/StringType';
import { SelectInput, SelectOutput } from '@common/repository/select';
import { OrderByInput } from '@common/repository/order';
import { WhereInput } from '@common/repository/where';
import { Tag } from '@core/domain/entities/Tag';

export type TagSelectInput = SelectInput<Tag>;
export type TagSelectOutput = SelectOutput<Tag>;

export type TagCountInput = {
  questions: true,
};

export type TagCountOutput = {
  questions: number,
};

export type TagOrderByType = {
  text?: OrderByEnum,
  questionsAmount?: OrderByEnum,
};

export type TagOrderBy = OrderByInput<TagOrderByType>;

export type TagWhere = WhereInput<{
  tagId?: BasicType<string>,
  name?: StringType,
  questions?: {
    questionId?: BasicType<string>,
  },
}>;