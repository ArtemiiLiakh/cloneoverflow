import { AnswerController } from '@application/answer/AnswerController';
import { AnswerService } from '@application/answer/AnswerService';
import { Provider } from '@nestjs/common';
import { ControllerDITokens } from '../../tokens/ControllerDITokens';
import { AnswerServiceDIToken } from '../../tokens/services';

export const AnswerControllerProvider: Provider = {
  provide: ControllerDITokens.AnswerController,
  useFactory: (answerService: AnswerService) => new AnswerController(answerService),
  inject: [AnswerServiceDIToken],
};