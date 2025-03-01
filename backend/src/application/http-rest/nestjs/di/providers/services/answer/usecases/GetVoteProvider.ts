import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { AnswerUserRepository } from '@core/repositories';
import { AnswerGetVoteUseCase } from '@core/services/answer';
import { Provider } from '@nestjs/common';

export const AnswerGetVoteUseCaseProvider: Provider = {
  provide: AnswerUseCaseDITokens.GetVote,
  
  useFactory: (
    answerUserRepository: AnswerUserRepository,
  ) => new AnswerGetVoteUseCase(
    answerUserRepository,
  ),

  inject: [
    PrismaRepositoryDITokens.AnswerUserRepository,
  ],
};