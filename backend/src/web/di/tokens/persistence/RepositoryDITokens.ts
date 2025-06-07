import { RedisCacheRepository } from '@infrastructure/persistence/cache/RedisCacheRepository';
import {
  PrismaAnswerRepository,
  PrismaAnswerVoterRepository,
  PrismaFavoriteQuestionRepository,
  PrismaQuestionRepository,
  PrismaQuestionVoterRepository,
  PrismaTagRepository,
  PrismaTransactionUnit,
  PrismaUserRepository,
} from '@infrastructure/persistence/prisma/repositories';

export const PrismaRepositoryDITokens = {
  UserRepository: Symbol(PrismaUserRepository.name),
  QuestionRepository: Symbol(PrismaQuestionRepository.name),
  QuestionVoterRepository: Symbol(PrismaQuestionVoterRepository.name),
  FavoriteQuestionRepository: Symbol(PrismaFavoriteQuestionRepository.name),
  AnswerRepository: Symbol(PrismaAnswerRepository.name),
  TagRepository: Symbol(PrismaTagRepository.name),
  AnswerVoterRepository: Symbol(PrismaAnswerVoterRepository.name),
  UnitOfWork: Symbol(PrismaTransactionUnit.name),
};

export const RedisRepositoryDITokens = {
  CacheRepository: Symbol(RedisCacheRepository.name),
};