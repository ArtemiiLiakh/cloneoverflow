import { AnswerUpdateUseCase } from '@application/answer/usecases';
import { IUserRatingValidator } from '@application/validators/types';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@web/di/tokens/services';
import { ValidatorDITokens } from '@web/di/tokens/ValidatorDITokens';

export const AnswerUpdateUseCaseProvider: Provider = {
  provide: AnswerUseCaseDITokens.Update,
  
  useFactory: (
    userRatingValidator: IUserRatingValidator,
    answerRepository: AnswerRepository,
  ) => new AnswerUpdateUseCase(
    userRatingValidator,
    answerRepository,
  ),

  inject: [
    ValidatorDITokens.UserRatingValidator,
    PrismaRepositoryDITokens.AnswerRepository,
  ],
};