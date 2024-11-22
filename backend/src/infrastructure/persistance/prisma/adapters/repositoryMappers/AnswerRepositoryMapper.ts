import { PaginatedData } from '@cloneoverflow/common';
import { AnswerRepositoryOutput } from '@core/domain/repositories/answer/output/AnswerRepositoryOutput';
import { PrismaAnswerType } from '../../types/PrismaAnswerTypes';
import { AnswerMapper } from '../entityMappers/AnswerMapper';
import { AnswerUserStatsMapper } from '../entityMappers/AnswerUserMapper';
import { QuestionMapper } from '../entityMappers/QuestionMapper';
import { UserMapper } from '../entityMappers/UserMapper';

export class AnswerRepositoryMapper {
  static findOne (answer: PrismaAnswerType): AnswerRepositoryOutput.FindOne {
    return {
      entity: AnswerMapper.toEntity(answer),
      users: answer.userAnswers ? AnswerUserStatsMapper.toEntities(answer.userAnswers) : undefined,
      owner: answer.owner ? UserMapper.toEntity(answer.owner) : undefined,
      question: answer.question ? QuestionMapper.toEntity(answer.question) : undefined,
      counts: answer._count ? {
        users: answer._count.userAnswers ?? undefined,
      } : undefined,
    };
  }

  static findMany (answers: PrismaAnswerType[]): AnswerRepositoryOutput.FindMany {
    return answers.map((answer) => this.findOne(answer)!);
  }

  static paginate ({ data, pagination }: PaginatedData<PrismaAnswerType>): AnswerRepositoryOutput.Paginate {
    return {
      data: this.findMany(data),
      pagination,
    };
  }

  static update (answer: PrismaAnswerType): AnswerRepositoryOutput.Update {
    return AnswerMapper.toEntity(answer);  
  }
}