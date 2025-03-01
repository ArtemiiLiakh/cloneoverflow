import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { UserUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services/UserDITokens';
import { AnswerRepository, QuestionRepository, UserRepository } from '@core/repositories';
import { UserGetProfileUseCase } from '@core/services/user';
import { Provider } from '@nestjs/common';

export const UserGetProfileUseCaseProvider: Provider = {
  provide: UserUseCaseDITokens.GetProfile,
  useFactory: (
    userRepository: UserRepository,
    questionRepository: QuestionRepository,
    answerRepository: AnswerRepository,
  ) => new UserGetProfileUseCase(userRepository, answerRepository, questionRepository),
  inject: [
    PrismaRepositoryDITokens.UserRepository,
    PrismaRepositoryDITokens.QuestionRepository,
    PrismaRepositoryDITokens.AnswerRepository,
  ],
};