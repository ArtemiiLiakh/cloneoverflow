import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { QuestionVoterRepository } from '@core/repositories';
import { QuestionGetVoterUseCase } from '@core/services/question';
import { Provider } from '@nestjs/common';

export const QuestionGetVoteUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.GetVoter,
  useFactory: (questionVoterRepository: QuestionVoterRepository) => {
    return new QuestionGetVoterUseCase(questionVoterRepository);
  },
  inject: [PrismaRepositoryDITokens.QuestionVoterRepository],
};