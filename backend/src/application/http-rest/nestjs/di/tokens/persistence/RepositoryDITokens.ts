import { RedisCacheRepository } from '@infrastructure/persistence/cache/RedisCacheRepository';
import {
  PrismaAnswerRepository,
  PrismaAnswerVoterRepository,
  PrismaQuestionRepository,
  PrismaQuestionVoterRepository,
  PrismaTagRepository,
  PrismaTransactionUnit,
  PrismaUserRepository,
} from '@infrastructure/persistence/prisma/repositories';

export const PrismaRepositoryDITokens = {
  UserRepository: Symbol(PrismaUserRepository.name),
  QuestionRepository: Symbol(PrismaQuestionRepository.name),
  AnswerRepository: Symbol(PrismaAnswerRepository.name),
  TagRepository: Symbol(PrismaTagRepository.name),
  QuestionVoterRepository: Symbol(PrismaQuestionVoterRepository.name),
  AnswerVoterRepository: Symbol(PrismaAnswerVoterRepository.name),
  UnitOfWork: Symbol(PrismaTransactionUnit.name),
};

export const RedisRepositoryDITokens = {
  CacheRepository: Symbol(RedisCacheRepository.name),
};