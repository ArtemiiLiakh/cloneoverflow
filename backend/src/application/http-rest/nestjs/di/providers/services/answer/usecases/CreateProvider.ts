import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { QuestionRepository, UnitOfWork } from '@core/repositories';
import { AnswerCreateUseCase } from '@core/services/answer';
import { Provider } from '@nestjs/common';

export const AnswerCreateUseCaseProvider: Provider = {
  provide: AnswerUseCaseDITokens.Create,
  
  useFactory: (
    questionRepository: QuestionRepository, 
    unitOfWork: UnitOfWork,
  ) => new AnswerCreateUseCase(
    questionRepository, 
    unitOfWork,
  ),

  inject: [
    PrismaRepositoryDITokens.QuestionRepository,
    PrismaRepositoryDITokens.UnitOfWork,
  ],
};