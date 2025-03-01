import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { ValidatorDITokens } from '@application/http-rest/nestjs/di/tokens/ValidatorDITokens';
import { AnswerRepository, QuestionRepository, UnitOfWork } from '@core/repositories';
import { QuestionCloseUseCase } from '@core/services/question';
import { IUserRatingValidator } from '@core/services/validators/types';
import { Provider } from '@nestjs/common';

export const QuestionCloseUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.Close,
  
  useFactory: (
    userRatingValidator: IUserRatingValidator, 
    questionRepository: QuestionRepository, 
    answerRepository: AnswerRepository, 
    unitOfWork: UnitOfWork,
  ) => new QuestionCloseUseCase(
    userRatingValidator, 
    questionRepository, 
    answerRepository, 
    unitOfWork,
  ),

  inject: [
    ValidatorDITokens.UserRatingValidator,
    PrismaRepositoryDITokens.QuestionRepository,
    PrismaRepositoryDITokens.AnswerRepository,
    PrismaRepositoryDITokens.UnitOfWork,
  ],
};