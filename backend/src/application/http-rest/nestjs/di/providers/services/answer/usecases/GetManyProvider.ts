import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { AnswerRepository } from '@core/repositories';
import { AnswerGetManyUseCase } from '@core/services/answer';
import { Provider } from '@nestjs/common';

export const AnswerGetManyUseCaseProvider: Provider = {
  provide: AnswerUseCaseDITokens.GetMany,
  
  useFactory: (
    answerRepository: AnswerRepository,
  ) => new AnswerGetManyUseCase(
    answerRepository,
  ),

  inject: [
    PrismaRepositoryDITokens.AnswerRepository,
  ],
};