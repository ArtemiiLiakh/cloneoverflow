import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { AnswerVoterRepository } from '@core/repositories';
import { AnswerGetVoterUseCase } from '@core/services/answer';
import { Provider } from '@nestjs/common';

export const AnswerGetVoterUseCaseProvider: Provider = {
  provide: AnswerUseCaseDITokens.GetVoter,
  
  useFactory: (
    answerVoterRepository: AnswerVoterRepository,
  ) => new AnswerGetVoterUseCase(answerVoterRepository),

  inject: [
    PrismaRepositoryDITokens.AnswerVoterRepository,
  ],
};