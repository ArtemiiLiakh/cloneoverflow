import { PaginationDTO, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionRelation } from '@common/relations/QuestionRelation';
import { CountOption } from '@common/repository/counts';
import { IncludeRelations } from '@common/repository/include';
import { RepositoryFindManyOptions, RepositoryOptions } from '@common/repository/options';
import { OrderByOption } from '@common/repository/orderBy';
import { Select } from '@common/repository/select';
import { Where } from '@common/repository/where';
import { Question } from '@core/domain/entities/Question';
import { Tag } from '@core/domain/entities/Tag';

export namespace QuestionRepositoryInput {
  export type QuestionSelect = Select<Question>;
  export type QuestionWhere = Where<Question & QuestionRelation>;
  export type QuestionInclude = IncludeRelations<QuestionRelation>;
  export type QuestionCount = CountOption<QuestionRelation>;
  export type QuestionOrderBy = OrderByOption<Question & QuestionRelation>; 

  export type FindById<
    Select=QuestionSelect, 
    Include=QuestionInclude, 
    Count=QuestionCount, 
    OrderBy=QuestionOrderBy,
  > = {
    id: string;
    options?: RepositoryOptions<Select, Include, Count, OrderBy>;
  };

  export type FindOne<
    Select=QuestionSelect, 
    Include=QuestionInclude, 
    Count=QuestionCount, 
    OrderBy=QuestionOrderBy,
  > = {
    where: QuestionWhere;
    options?: RepositoryOptions<Select, Include, Count, OrderBy>;
  };

  export type FindMany<
    Select=QuestionSelect, 
    Include=QuestionInclude, 
    Count=QuestionCount, 
    OrderBy=QuestionOrderBy,
  > = {
    where: QuestionWhere;
    options?: RepositoryFindManyOptions<Select, Include, Count, OrderBy>;
  };

  export type Paginate<
    Select=QuestionSelect, 
    Include=QuestionInclude, 
    Count=QuestionCount, 
    OrderBy=QuestionOrderBy,
  > = {
    where: QuestionWhere;
    pagination?: PaginationDTO;
    options?: RepositoryFindManyOptions<Select, Include, Count, OrderBy>;
  };

  export type Count = {
    where: QuestionWhere;
  };

  export type Create = {
    question: Question;
  };
  
  export type Update = {
    id: string;
    question: Partial<Question>;
    returnEntity?: boolean;
  };
  
  export type Delete = {
    question: Question;
  };
  
  export type VoteQuestion = {
    questionId: string;
    voteType: VoteTypeEnum;
  };

  export type RefTags = {
    questionId: string;
    tags: Tag[];
  };

  export type UnrefTags = {
    questionId: string;
  };
}