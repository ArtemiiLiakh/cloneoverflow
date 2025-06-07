import { QuestionGetVoterUseCase } from '@application/question/usecases';
import { QuestionVoterRepository } from '@core/question/repository/QuestionVoterRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@web/di/tokens/services';

export const QuestionGetVoteUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.GetVoter,
  useFactory: (questionVoterRepository: QuestionVoterRepository) => {
    return new QuestionGetVoterUseCase(questionVoterRepository);
  },
  inject: [PrismaRepositoryDITokens.QuestionVoterRepository],
};