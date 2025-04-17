import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { AnswerRepository, QuestionRepository } from '@core/repositories';
import { AnswerCreateUseCase } from '@core/services/answer';
import { Provider } from '@nestjs/common';

export const AnswerCreateUseCaseProvider: Provider = {
  provide: AnswerUseCaseDITokens.Create,
  
  useFactory: (
    questionRepository: QuestionRepository, 
    answerRepository: AnswerRepository,
  ) => new AnswerCreateUseCase(
    questionRepository, 
    answerRepository,
  ),

  inject: [
    PrismaRepositoryDITokens.QuestionRepository,
    PrismaRepositoryDITokens.AnswerRepository,
  ],
};