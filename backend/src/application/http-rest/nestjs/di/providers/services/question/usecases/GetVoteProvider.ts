import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { QuestionUserRepository } from '@core/repositories';
import { QuestionGetVoteUseCase } from '@core/services/question';
import { Provider } from '@nestjs/common';

export const QuestionGetVoteUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.GetVote,
  useFactory: (questionUserRepository: QuestionUserRepository) => new QuestionGetVoteUseCase(questionUserRepository),
  inject: [PrismaRepositoryDITokens.QuestionUserRepository],
};