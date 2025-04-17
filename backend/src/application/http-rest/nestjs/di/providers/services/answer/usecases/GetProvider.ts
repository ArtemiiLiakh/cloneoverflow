import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { AnswerRepository } from '@core/repositories';
import { AnswerGetUseCase } from '@core/services/answer';
import { Provider } from '@nestjs/common';

export const AnswerGetUseCaseProvider: Provider = {
  provide: AnswerUseCaseDITokens.Get,
  
  useFactory: (
    answerRepository: AnswerRepository,
  ) => new AnswerGetUseCase(answerRepository),

  inject: [
    PrismaRepositoryDITokens.AnswerRepository,
  ],
};