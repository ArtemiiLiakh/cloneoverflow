import { PaginationInput, VoteTypeEnum } from "@cloneoverflow/common";
import { QuestionRelation } from "@common/relations/QuestionRelation";
import { CountOption } from "@common/repository/counts";
import { IncludeRelations } from "@common/repository/include";
import { RepositoryFindManyOptions, RepositoryOptions } from "@common/repository/options";
import { OrderByOption } from "@common/repository/orderBy";
import { Where } from "@common/repository/where";
import { Question } from "@core/domain/entities/Question";
import { Tag } from "@core/domain/entities/Tag";

export namespace QuestionRepositoryInput {
  export type QuestionWhere = Where<Question & QuestionRelation>;
  export type QuestionInclude = IncludeRelations<QuestionRelation>;
  export type QuestionCount = CountOption<QuestionRelation>;
  export type QuestionOrderBy = OrderByOption<Question & QuestionRelation>; 

  export type QuestionRepositoryOptions = RepositoryOptions<QuestionInclude, QuestionCount, QuestionOrderBy>;
  export type QuestionFindManyRepositoryOptions = RepositoryFindManyOptions<QuestionInclude, QuestionCount, QuestionOrderBy>;

  export type FindById = {
    id: string;
    options?: QuestionRepositoryOptions;
  };

  export type FindOne = {
    where: QuestionWhere;
    options?: QuestionRepositoryOptions;
  };

  export type FindMany = {
    where: QuestionWhere;
    options?: QuestionFindManyRepositoryOptions;
  };

  export type Paginate = {
    where: QuestionWhere;
    pagination?: PaginationInput;
    options?: QuestionFindManyRepositoryOptions;
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
  };
  
  export type Delete = {
    question: Question;
  };
  
  export type VoteQuestion = {
    questionId: string;
    voteType: VoteTypeEnum;
  };

  export type RefTags = {
    id: string;
    tags: Tag[];
  };

  export type UnrefTags = {
    id: string;
  };
}