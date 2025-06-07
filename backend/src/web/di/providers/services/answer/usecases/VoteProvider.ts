import { AnswerVoteUseCase } from '@application/answer/usecases';
import { IUserRatingValidator } from '@application/validators/types';
import { UnitOfWork } from '@common/repository/UnitOfWork';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@web/di/tokens/services';
import { ValidatorDITokens } from '@web/di/tokens/ValidatorDITokens';

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