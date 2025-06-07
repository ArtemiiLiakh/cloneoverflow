import { AnswerGetVoterUseCase } from '@application/answer/usecases';
import { AnswerVoterRepository } from '@core/answer/repository/AnswerVoterRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@web/di/tokens/services';

export const AnswerGetVoterUseCaseProvider: Provider = {
  provide: AnswerUseCaseDITokens.GetVoter,
  
  useFactory: (
    answerVoterRepository: AnswerVoterRepository,
  ) => new AnswerGetVoterUseCase(answerVoterRepository),

  inject: [
    PrismaRepositoryDITokens.AnswerVoterRepository,
  ],
};