import { PaginationDTO } from '@cloneoverflow/common';
import { AnswerRelation } from '@common/relations/AnswerRelation';
import { CountOption } from '@common/repository/counts';
import { IncludeRelations } from '@common/repository/include';
import { RepositoryFindManyOptions, RepositoryOptions } from '@common/repository/options';
import { OrderByOption } from '@common/repository/orderBy';
import { Select } from '@common/repository/select';
import { Where } from '@common/repository/where';
import { Answer } from '@core/domain/entities/Answer';

export namespace AnswerRepositoryInput {
  export type AnswerSelect = Select<Answer>;
  export type AnswerWhere = Where<Answer & AnswerRelation>
  export type AnswerInclude = IncludeRelations<AnswerRelation>;
  export type AnswerCount = CountOption<AnswerRelation>;
  export type AnswerOrderBy = OrderByOption<Answer & AnswerRelation>;

  export type FindById<
    Select=AnswerSelect, 
    Include=AnswerInclude, 
    Count=AnswerCount, 
    OrderBy=AnswerOrderBy,
  > = {
    id: string, 
    options?: RepositoryOptions<Select, Include, Count, OrderBy>,
  };

  export type FindOne<
    Select=AnswerSelect, 
    Include=AnswerInclude, 
    Count=AnswerCount, 
    OrderBy=AnswerOrderBy,
  > = {
    where: AnswerWhere, 
    options?: RepositoryOptions<Select, Include, Count, OrderBy>,
  };

  export type FindMany<
    Select=AnswerSelect, 
    Include=AnswerInclude, 
    Count=AnswerCount, 
    OrderBy=AnswerOrderBy,
  > = {
    where: AnswerWhere, 
    options?: RepositoryFindManyOptions<Select, Include, Count, OrderBy>,
  };

  export type Paginate<
    Select=AnswerSelect, 
    Include=AnswerInclude, 
    Count=AnswerCount, 
    OrderBy=AnswerOrderBy,
  > = {
    where: AnswerWhere, 
    pagination?: PaginationDTO, 
    options?: RepositoryFindManyOptions<Select, Include, Count, OrderBy>,
  };
  
  export type Count = {
    where: AnswerWhere, 
  };

  export type Create = {
    answer: Answer
  };

  export type Update = {
    id: string, 
    answer: Partial<Answer>,
  };

  export type UpdateMany = {
    where: AnswerWhere, 
    answer: Partial<Answer>,
  };

  export type Delete = {
    answer: Answer,
  };
}