import { QuestionVoteUseCase } from '@application/question/usecases';
import { IUserRatingValidator } from '@application/validators/types';
import { UnitOfWork } from '@common/repository/UnitOfWork';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@web/di/tokens/services';
import { ValidatorDITokens } from '@web/di/tokens/ValidatorDITokens';

export const QuestionVoteUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.Vote,
  
  useFactory: (
    userRatingValidator: IUserRatingValidator,
    questionRepository: QuestionRepository,
    unitOfWork: UnitOfWork,
  ) => new QuestionVoteUseCase(
    userRatingValidator, 
    questionRepository,
    unitOfWork,
  ),
  
  inject: [
    ValidatorDITokens.UserRatingValidator,
    PrismaRepositoryDITokens.QuestionRepository,
    PrismaRepositoryDITokens.UnitOfWork,
  ],
};