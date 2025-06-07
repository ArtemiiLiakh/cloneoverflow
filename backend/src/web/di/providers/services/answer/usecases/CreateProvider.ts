import { AnswerCreateUseCase } from '@application/answer/usecases';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { AnswerUseCaseDITokens } from '@web/di/tokens/services';

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