import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { ValidatorDITokens } from '@application/http-rest/nestjs/di/tokens/ValidatorDITokens';
import { AnswerRepository } from '@core/repositories';
import { AnswerUpdateUseCase } from '@core/services/answer';
import { IUserRatingValidator } from '@core/services/validators/types';
import { Provider } from '@nestjs/common';

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