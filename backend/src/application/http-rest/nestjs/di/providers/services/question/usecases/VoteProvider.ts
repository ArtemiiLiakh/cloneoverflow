import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { ValidatorDITokens } from '@application/http-rest/nestjs/di/tokens/ValidatorDITokens';
import { QuestionRepository, QuestionUserRepository, UnitOfWork } from '@core/repositories';
import { QuestionVoteUseCase } from '@core/services/question';
import { IUserRatingValidator } from '@core/services/validators/types';
import { Provider } from '@nestjs/common';

export const QuestionVoteUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.Vote,
  
  useFactory: (
    userRatingValidator: IUserRatingValidator,
    questionRepository: QuestionRepository,
    questionUserRepository: QuestionUserRepository,
    unitOfWork: UnitOfWork,
  ) => new QuestionVoteUseCase(
    userRatingValidator, 
    questionRepository,
    questionUserRepository,
    unitOfWork,
  ),
  
  inject: [
    ValidatorDITokens.UserRatingValidator,
    PrismaRepositoryDITokens.QuestionRepository,
    PrismaRepositoryDITokens.QuestionUserRepository,
    PrismaRepositoryDITokens.UnitOfWork,
  ],
};