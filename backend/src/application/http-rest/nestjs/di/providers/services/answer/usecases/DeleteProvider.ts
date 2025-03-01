import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { AnswerRepository, UnitOfWork } from '@core/repositories';
import { AnswerDeleteUseCase } from '@core/services/answer';
import { Provider } from '@nestjs/common';

export const AnswerDeleteUseCaseProvider: Provider = {
  provide: AnswerUseCaseDITokens.Delete,
  
  useFactory: (
    answerRepository: AnswerRepository,
    unitOfWork: UnitOfWork,
  ) => new AnswerDeleteUseCase(
    answerRepository,
    unitOfWork,
  ),

  inject: [
    PrismaRepositoryDITokens.AnswerRepository,
    PrismaRepositoryDITokens.UnitOfWork,
  ],
};