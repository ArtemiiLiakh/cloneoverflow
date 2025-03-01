import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { ValidatorDITokens } from '@application/http-rest/nestjs/di/tokens/ValidatorDITokens';
import { QuestionRepository, UnitOfWork } from '@core/repositories';
import { QuestionOpenUseCase } from '@core/services/question';
import { IUserRatingValidator } from '@core/services/validators/types';
import { Provider } from '@nestjs/common';

export const QuestionOpenUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.Open,
  
  useFactory: (
    userRatingValidator: IUserRatingValidator, 
    questionRepository: QuestionRepository, 
    unitOfWork: UnitOfWork,
  ) => new QuestionOpenUseCase(
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