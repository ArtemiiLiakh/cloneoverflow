import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { QuestionRepository } from '@core/repositories';
import { QuestionGetDetailsUseCase } from '@core/services/question';
import { Provider } from '@nestjs/common';

export const QuestionGetDetailsProvider: Provider = {
  provide: QuestionUseCaseDITokens.GetDetails,
  useFactory: (questionRepoistory: QuestionRepository) => new QuestionGetDetailsUseCase(questionRepoistory),
  inject: [PrismaRepositoryDITokens.QuestionRepository],
};