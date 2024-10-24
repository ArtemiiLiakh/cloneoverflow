import { PaginatedData } from "@common/utils/PaginatedData";
import { AnswerRepository } from "@core/domain/repositories/answer/AnswerRepository";
import { AnswerRepositoryOutput } from "@core/domain/repositories/answer/output/AnswerRepositoryOutput";
import { PrismaAnswerType } from "@infra/persistance/prisma/types/PrismaAnswerTypes";
import { AnswerMapper } from "../entityMappers/AnswerMapper";
import { RepositoryMapper } from "./RepositoryMapper";
import { AnswerUserStatsMapper } from "../entityMappers/AnswerUserMapper";
import { UserMapper } from "../entityMappers/UserMapper";
import { QuestionMapper } from "../entityMappers/QuestionMapper";

export class AnswerRepositoryMapper implements RepositoryMapper<AnswerRepository> {
  static findOne(answer: PrismaAnswerType): AnswerRepositoryOutput.FindOne {
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

  static findMany(answers: PrismaAnswerType[]): AnswerRepositoryOutput.FindMany {
    return answers.map((answer) => this.findOne(answer)!);
  }

  static paginate({ data, pagination }: PaginatedData<PrismaAnswerType>): AnswerRepositoryOutput.Paginate {
    return {
      data: this.findMany(data),
      pagination,
    }
  }

  static update(answer: PrismaAnswerType): AnswerRepositoryOutput.Update {
    return AnswerMapper.toEntity(answer);  
  }
}