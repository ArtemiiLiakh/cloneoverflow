import { QuestionGetDetailsUseCase } from '@application/question/usecases';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@web/di/tokens/services';

export const QuestionGetDetailsProvider: Provider = {
  provide: QuestionUseCaseDITokens.GetDetails,
  useFactory: (questionRepoistory: QuestionRepository) => new QuestionGetDetailsUseCase(questionRepoistory),
  inject: [PrismaRepositoryDITokens.QuestionRepository],
};