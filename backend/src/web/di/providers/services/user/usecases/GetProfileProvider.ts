import { UserGetProfileUseCase } from '@application/user/usecases';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { UserRepository } from '@core/user/repository/UserRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { UserUseCaseDITokens } from '@web/di/tokens/services/UserDITokens';

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