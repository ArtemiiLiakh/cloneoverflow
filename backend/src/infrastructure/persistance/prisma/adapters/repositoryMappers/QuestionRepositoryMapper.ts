import { PaginatedData } from '@cloneoverflow/common';
import { QuestionRepositoryOutput } from '@core/domain/repositories/question/output/QuestionRepositoryOutput';
import { PrismaQuestionType } from '../../types/PrismaQuestionTypes';
import { AnswerMapper } from '../entityMappers/AnswerMapper';
import { QuestionMapper } from '../entityMappers/QuestionMapper';
import { QuestionUserStatsMapper } from '../entityMappers/QuestionUserMapper';
import { TagMapper } from '../entityMappers/TagMapper';
import { UserMapper } from '../entityMappers/UserMapper';

export class QuestionRepositoryMapper {
  static findOne (question: PrismaQuestionType): QuestionRepositoryOutput.FindOne {
    return {
      entity: QuestionMapper.toEntity(question),
      owner: question.owner ? UserMapper.toEntity(question.owner) : undefined,
      answers: question.answers ? AnswerMapper.toEntities(question.answers): undefined,
      tags: question.tags ? TagMapper.toEntities(question.tags) : undefined,
      users: question.userQuestions ? QuestionUserStatsMapper.toEntities(question.userQuestions) : undefined,
      counts: question._count ? {
        answers: question._count.answers ?? undefined,
        tags: question._count.tags ?? undefined,
        users: question._count.userQuestions ?? undefined,
      } : undefined,
    };
  }

  static findMany (questions: PrismaQuestionType[]): QuestionRepositoryOutput.FindMany {
    return questions.map(question => this.findOne(question)!);
  }

  static paginate ({ data, pagination }: PaginatedData<PrismaQuestionType>): QuestionRepositoryOutput.Paginate {
    return {
      data: this.findMany(data),
      pagination,
    };
  }

  static update (question: PrismaQuestionType): QuestionRepositoryOutput.Update {
    return QuestionMapper.toEntity(question);
  }
}