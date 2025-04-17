import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { ValidatorDITokens } from '@application/http-rest/nestjs/di/tokens/ValidatorDITokens';
import { AnswerRepository, UnitOfWork } from '@core/repositories';
import { AnswerVoteUseCase } from '@core/services/answer';
import { IUserRatingValidator } from '@core/services/validators/types';
import { Provider } from '@nestjs/common';

export const AnswerVoteUseCaseProvider: Provider = {
  provide: AnswerUseCaseDITokens.Vote,
  
  useFactory: (
    userRatingValidator: IUserRatingValidator,
    answerRepository: AnswerRepository,
    unitOfWork: UnitOfWork,
  ) => new AnswerVoteUseCase(
    userRatingValidator,
    answerRepository,
    unitOfWork,
  ),

  inject: [
    ValidatorDITokens.UserRatingValidator,
    PrismaRepositoryDITokens.AnswerRepository,
    PrismaRepositoryDITokens.UnitOfWork,
  ],
};