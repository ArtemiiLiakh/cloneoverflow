import { PaginationInput } from "@cloneoverflow/common";
import { AnswerRelation } from "@common/relations/AnswerRelation";
import { CountOption } from "@common/repository/counts";
import { IncludeRelations } from "@common/repository/include";
import { RepositoryFindManyOptions, RepositoryOptions } from "@common/repository/options";
import { OrderByOption } from "@common/repository/orderBy";
import { Where } from "@common/repository/where";
import { Answer } from "@core/domain/entities/Answer";

export namespace AnswerRepositoryInput {
  export type AnswerWhere = Where<Answer & AnswerRelation>
  export type AnswerInclude = IncludeRelations<AnswerRelation>;
  export type AnswerCount = CountOption<AnswerRelation>;
  export type AnswerOrderBy = OrderByOption<Answer & AnswerRelation>;

  export type AnswerRepositoryOptions = RepositoryOptions<AnswerInclude, AnswerCount, AnswerOrderBy>;
  export type AnswerFindManyRepositoryOptions = RepositoryFindManyOptions<AnswerInclude, AnswerCount, AnswerOrderBy>;

  export type FindById = {
    id: string, 
    options?: AnswerRepositoryOptions,
  };

  export type FindOne = {
    where: AnswerWhere, 
    options?: AnswerRepositoryOptions,
  };

  export type FindMany = {
    where: AnswerWhere, 
    options?: AnswerFindManyRepositoryOptions,
  };

  export type Paginate = {
    where: AnswerWhere, 
    pagination?: PaginationInput, 
    options?: AnswerFindManyRepositoryOptions,
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