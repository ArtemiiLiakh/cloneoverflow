import { QuestionController } from '@application/controllers/QuestionController';
import { QuestionServiceFacade } from '@application/facades/QuestionServiceFacade';
import { Provider } from '@nestjs/common';
import { ControllerDITokens } from '../../tokens/ControllerDITokens';
import { QuestionServiceDIToken } from '../../tokens/services';

export const QuestionControllerProvider: Provider = {
  provide: ControllerDITokens.QuestionController,
  useFactory: (questionService: QuestionServiceFacade) => new QuestionController(questionService),
  inject: [QuestionServiceDIToken],
};