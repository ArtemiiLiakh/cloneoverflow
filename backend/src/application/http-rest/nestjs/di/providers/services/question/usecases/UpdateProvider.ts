import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { ValidatorDITokens } from '@application/http-rest/nestjs/di/tokens/ValidatorDITokens';
import { QuestionRepository, UnitOfWork } from '@core/repositories';
import { QuestionUpdateUseCase } from '@core/services/question';
import { IUserRatingValidator } from '@core/services/validators/types';
import { Provider } from '@nestjs/common';

export const QuestionUpdateUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.Update,
  
  useFactory: (
    userRatingValidator: IUserRatingValidator,
    questionRepository: QuestionRepository,
    unitOfWork: UnitOfWork,
  ) => new QuestionUpdateUseCase(
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