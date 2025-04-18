import { QuestionController } from '@application/controllers/QuestionController';
import { AnswerServiceFacade } from '@application/service-facades/AnswerServiceFacade';
import { QuestionServiceFacade } from '@application/service-facades/QuestionServiceFacade';
import { Provider } from '@nestjs/common';
import { ControllerDITokens } from '../../tokens/ControllerDITokens';
import { AnswerServiceDIToken, QuestionServiceDIToken } from '../../tokens/services';

export const QuestionControllerProvider: Provider = {
  provide: ControllerDITokens.QuestionController,
  useFactory: (
    questionService: QuestionServiceFacade, 
    answerService: AnswerServiceFacade,
  ) => new QuestionController(questionService, answerService),
  inject: [QuestionServiceDIToken, AnswerServiceDIToken],
};