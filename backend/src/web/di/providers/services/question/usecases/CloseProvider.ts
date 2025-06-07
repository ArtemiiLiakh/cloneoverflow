import { QuestionCloseUseCase } from '@application/question/usecases';
import { UnitOfWork } from '@common/repository/UnitOfWork';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@web/di/tokens/services';

export const QuestionCloseUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.Close,
  
  useFactory: (
    questionRepository: QuestionRepository, 
    answerRepository: AnswerRepository, 
    unitOfWork: UnitOfWork,
  ) => new QuestionCloseUseCase(
    questionRepository, 
    answerRepository, 
    unitOfWork,
  ),

  inject: [
    PrismaRepositoryDITokens.QuestionRepository,
    PrismaRepositoryDITokens.AnswerRepository,
    PrismaRepositoryDITokens.UnitOfWork,
  ],
};