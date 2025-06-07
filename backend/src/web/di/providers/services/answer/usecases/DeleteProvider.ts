import { AnswerDeleteUseCase } from '@application/answer/usecases';
import { UnitOfWork } from '@common/repository/UnitOfWork';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@web/di/tokens/services';

export const AnswerDeleteUseCaseProvider: Provider = {
  provide: AnswerUseCaseDITokens.Delete,
  
  useFactory: (
    answerRepository: AnswerRepository,
    unitOfWork: UnitOfWork,
  ) => new AnswerDeleteUseCase(
    answerRepository,
    unitOfWork,
  ),

  inject: [
    PrismaRepositoryDITokens.AnswerRepository,
    PrismaRepositoryDITokens.UnitOfWork,
  ],
};