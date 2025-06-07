import { AnswerGetUseCase } from '@application/answer/usecases';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@web/di/tokens/services';

export const AnswerGetUseCaseProvider: Provider = {
  provide: AnswerUseCaseDITokens.Get,
  
  useFactory: (
    answerRepository: AnswerRepository,
  ) => new AnswerGetUseCase(answerRepository),

  inject: [
    PrismaRepositoryDITokens.AnswerRepository,
  ],
};