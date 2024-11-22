import { UserRepositoryOutput } from '@core/domain/repositories/user/output/UserRepositoryOutput';
import { PrismaUserCredsType, PrismaUserType, PrismaUserWithCredsType } from '../../types/PrismaUserTypes';
import { AnswerMapper } from '../entityMappers/AnswerMapper';
import { QuestionMapper } from '../entityMappers/QuestionMapper';
import { UserCredsMapper } from '../entityMappers/UserCredsMapper';
import { UserMapper } from '../entityMappers/UserMapper';

export class UserRepositoryMapper {
  static findOne (user: PrismaUserType): UserRepositoryOutput.FindOne {
    return {
      entity: UserMapper.toEntity(user),
      answers: user.answers ? AnswerMapper.toEntities(user.answers) : undefined,
      questions: user.questions ? QuestionMapper.toEntities(user.questions) : undefined,
      counts: user._count ? {
        answers: user._count.answers,
        questions: user._count.questions,
      } : undefined,
    };
  }
  
  static findCreds (creds: PrismaUserCredsType): UserRepositoryOutput.FindCreds {
    return UserCredsMapper.toEntity(creds);
  }
  
  static findWithCreds (creds: PrismaUserWithCredsType): UserRepositoryOutput.FindWithCreds {
    return {
      user: UserMapper.toEntity(creds.user!),
      creds: UserCredsMapper.toEntity(creds),
    };
  }
  
  static findMany (users: PrismaUserType[]): UserRepositoryOutput.FindMany {
    return users.map(user => this.findOne(user)!);
  }
  
  static update (user: PrismaUserType): UserRepositoryOutput.Update {
    return UserMapper.toEntity(user);
  }
  
  static updateCreds (creds: PrismaUserWithCredsType): UserRepositoryOutput.UpdateCreds {
    return UserMapper.toEntity(creds.user!);
  }
}