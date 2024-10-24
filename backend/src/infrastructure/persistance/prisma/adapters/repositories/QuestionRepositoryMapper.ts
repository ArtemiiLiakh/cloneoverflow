import { PaginatedData } from "@common/utils/PaginatedData";
import { QuestionRepositoryOutput } from "@core/domain/repositories/question/output/QuestionRepositoryOutput";
import { QuestionRepository } from "@core/domain/repositories/question/QuestionRepository";
import { QuestionMapper } from "../entityMappers/QuestionMapper";
import { PrismaQuestionType } from "../../types/PrismaQuestionTypes";
import { RepositoryMapper } from "./RepositoryMapper";
import { UserMapper } from "../entityMappers/UserMapper";
import { AnswerMapper } from "../entityMappers/AnswerMapper";
import { TagMapper } from "../entityMappers/TagMapper";
import { QuestionUserStatsMapper } from "../entityMappers/QuestionUserMapper";

export class QuestionRepositoryMapper implements RepositoryMapper<QuestionRepository> {
  static findOne(question: PrismaQuestionType): QuestionRepositoryOutput.FindOne {
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

  static findMany(questions: PrismaQuestionType[]): QuestionRepositoryOutput.FindMany {
    return questions.map(question => this.findOne(question)!);
  }

  static paginate({ data, pagination }: PaginatedData<PrismaQuestionType>): QuestionRepositoryOutput.Paginate {
    return {
      data: this.findMany(data),
      pagination,
    };
  }

  static update(question: PrismaQuestionType): QuestionRepositoryOutput.Update {
    return QuestionMapper.toEntity(question);
  }
}