import { AnswerService } from '@application/answer/AnswerService';
import { QuestionController } from '@application/question/QuestionController';
import { QuestionService } from '@application/question/QuestionService';
import { Provider } from '@nestjs/common';
import { ControllerDITokens } from '@web/di/tokens/ControllerDITokens';
import { AnswerServiceDIToken, QuestionServiceDIToken } from '@web/di/tokens/services';

export const QuestionControllerProvider: Provider = {
  provide: ControllerDITokens.QuestionController,
  useFactory: (
    questionService: QuestionService, 
    answerService: AnswerService,
  ) => new QuestionController(questionService, answerService),
  inject: [QuestionServiceDIToken, AnswerServiceDIToken],
};