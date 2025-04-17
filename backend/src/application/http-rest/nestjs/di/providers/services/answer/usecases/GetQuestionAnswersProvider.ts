import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { AnswerRepository } from '@core/repositories';
import { AnswerGetByQuestionUseCase } from '@core/services/answer';
import { Provider } from '@nestjs/common';

export const AnswerGetByQuestionProvider: Provider = {
  provide: AnswerUseCaseDITokens.GetByQuestion,
  useFactory: (answerRepository: AnswerRepository) => new AnswerGetByQuestionUseCase(answerRepository),
  inject: [PrismaRepositoryDITokens.AnswerRepository],
};