import { RedisCacheRepository } from '@infrastructure/persistence/cache/RedisCacheRepository';
import {
  PrismaAnswerRepository,
  PrismaAnswerUserRepository,
  PrismaQuestionRepository,
  PrismaQuestionUserRepository,
  PrismaTagRepository,
  PrismaTransactionUnit,
  PrismaUserRepository,
} from '@infrastructure/persistence/prisma/repositories';

export const PrismaRepositoryDITokens = {
  UserRepository: Symbol(PrismaUserRepository.name),
  QuestionRepository: Symbol(PrismaQuestionRepository.name),
  AnswerRepository: Symbol(PrismaAnswerRepository.name),
  TagRepository: Symbol(PrismaTagRepository.name),
  UnitOfWork: Symbol(PrismaTransactionUnit.name),
  QuestionUserRepository: Symbol(PrismaQuestionUserRepository.name),
  AnswerUserRepository: Symbol(PrismaAnswerUserRepository.name),
};

export const RedisRepositoryDITokens = {
  CacheRepository: Symbol(RedisCacheRepository.name),
};