import { UserRepositoryOutput } from "@core/domain/repositories/user/output/UserRepositoryOutput";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { UserCredsMapper } from "../entityMappers/UserCredsMapper";
import { UserMapper } from "../entityMappers/UserMapper";
import { PrismaUserCredsType, PrismaUserType } from "../../types/PrismaUserTypes";
import { RepositoryMapper } from "./RepositoryMapper";
import { AnswerMapper } from "../entityMappers/AnswerMapper";
import { QuestionMapper } from "../entityMappers/QuestionMapper";

export class UserRepositoryMapper implements RepositoryMapper<UserRepository> {
  static findOne(user: PrismaUserType): UserRepositoryOutput.FindOne {
    return {
      entity: UserMapper.toEntity(user),
      answers: user.answers ? AnswerMapper.toEntities(user.answers) : undefined,
      questions: user.questions ? QuestionMapper.toEntities(user.questions) : undefined,
      counts: user._count ? {
        answers: user._count.answers ?? undefined,
        questions: user._count.questions ?? undefined,
      } : undefined,
    };
  }
  
  static findWithCreds(creds: PrismaUserCredsType): UserRepositoryOutput.FindWithCreds {
    return {
      user: this.findOne(creds.user!)!.entity,
      creds: UserCredsMapper.toEntity(creds),
    };
  }
  
  static findMany(users: PrismaUserType[]): UserRepositoryOutput.FindMany {
    return users.map(user => this.findOne(user)!);
  }
  
  static update(user: PrismaUserType): UserRepositoryOutput.Update {
    return UserMapper.toEntity(user);
  }
  
  static updateCreds(creds: PrismaUserCredsType): UserRepositoryOutput.UpdateCreds {
    return UserMapper.toEntity(creds.user!);
  }
}