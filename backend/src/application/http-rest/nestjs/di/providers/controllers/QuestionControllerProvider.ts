import { QuestionController } from '@application/controllers/QuestionController';
import { QuestionServiceFacade } from '@application/facades/QuestionServiceFacade';
import { Provider } from '@nestjs/common';
import { ControllerDITokens } from '../../tokens/ControllerDITokens';
import { AnswerUseCaseDITokens, QuestionServiceDIToken } from '../../tokens/services';
import { IAnswerGetByQuestionUseCase } from '@core/services/answer/types';

export const QuestionControllerProvider: Provider = {
  provide: ControllerDITokens.QuestionController,
  useFactory: (
    questionService: QuestionServiceFacade, 
    getQuestionAnswersUseCase: IAnswerGetByQuestionUseCase,
  ) => new QuestionController(questionService, getQuestionAnswersUseCase),
  inject: [QuestionServiceDIToken, AnswerUseCaseDITokens.GetByQuestion],
};