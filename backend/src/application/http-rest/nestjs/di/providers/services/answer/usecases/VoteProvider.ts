import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { ValidatorDITokens } from '@application/http-rest/nestjs/di/tokens/ValidatorDITokens';
import { AnswerRepository, AnswerUserRepository, UnitOfWork } from '@core/repositories';
import { AnswerVoteUseCase } from '@core/services/answer';
import { IUserRatingValidator } from '@core/services/validators/types';
import { Provider } from '@nestjs/common';

export const AnswerVoteUseCaseProvider: Provider = {
  provide: AnswerUseCaseDITokens.Vote,
  
  useFactory: (
    userRatingValidator: IUserRatingValidator,
    answerRepository: AnswerRepository,
    answerUserRepository: AnswerUserRepository,
    unitOfWork: UnitOfWork,
  ) => new AnswerVoteUseCase(
    userRatingValidator,
    answerRepository,
    answerUserRepository,
    unitOfWork,
  ),

  inject: [
    ValidatorDITokens.UserRatingValidator,
    PrismaRepositoryDITokens.AnswerRepository,
    PrismaRepositoryDITokens.AnswerUserRepository,
    PrismaRepositoryDITokens.UnitOfWork,
  ],
};