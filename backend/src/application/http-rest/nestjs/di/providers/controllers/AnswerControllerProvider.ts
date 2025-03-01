import { AnswerController } from '@application/controllers/AnswerController';
import { AnswerServiceFacade } from '@application/facades/AnswerServiceFacade';
import { Provider } from '@nestjs/common';
import { ControllerDITokens } from '../../tokens/ControllerDITokens';
import { AnswerServiceDIToken } from '../../tokens/services';

export const AnswerControllerProvider: Provider = {
  provide: ControllerDITokens.AnswerController,
  useFactory: (answerService: AnswerServiceFacade) => new AnswerController(answerService),
  inject: [AnswerServiceDIToken],
};