import { AnswerGetByQuestionUseCase } from '@application/answer/usecases';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@web/di/tokens/services';

export const AnswerGetByQuestionProvider: Provider = {
  provide: AnswerUseCaseDITokens.GetByQuestion,
  useFactory: (answerRepository: AnswerRepository) => new AnswerGetByQuestionUseCase(answerRepository),
  inject: [PrismaRepositoryDITokens.AnswerRepository],
};