import { AdaptController } from '@app/adapters/AdaptController';
import { QuestionController } from '@app/controllers/QuestionController';
import { questionServiceFacadeDI } from '@app/di/service/QuestionServiceDI';
import { searchUseCasesDI } from '@app/di/service/SearchServiceDI';
import { JwtAuthAccess, JwtGetAuth } from '@app/middlewares/JwtAuthAccess';
import { validateRequest } from '@app/middlewares/validation';
import {
  QuestionCloseDTO,
  QuestionCreateDTO,
  QuestionGetDTO,
  QuestionUpdateDTO,
  SearchQuestionsDTO,
  VoteDTO
} from '@cloneoverflow/common';
import express from 'express';

const questionRouter = express.Router();

const controller = new QuestionController(
  questionServiceFacadeDI, 
  searchUseCasesDI.SearchQuestionsUseCase,
);

questionRouter.get(
  '/search',
  validateRequest({
    query: SearchQuestionsDTO,
  }),
  AdaptController(controller.search.bind(controller))
);

questionRouter.get(
  '/:questionId', 
  JwtGetAuth(),
  validateRequest({
    query: QuestionGetDTO,
  }), 
  AdaptController(controller.get.bind(controller))
);

questionRouter.post(
  '/', 
  JwtAuthAccess(),
  validateRequest({
    body: QuestionCreateDTO,
  }), 
  AdaptController(controller.create.bind(controller))
);

questionRouter.patch(
  '/:questionId',
  JwtAuthAccess(),
  validateRequest({
    body: QuestionUpdateDTO,
  }),
  AdaptController(controller.update.bind(controller))
);

questionRouter.delete(
  '/:questionId',
  JwtAuthAccess(),
  AdaptController(controller.delete.bind(controller))
);

questionRouter.post(
  '/:questionId/close',
  JwtAuthAccess(),
  validateRequest({
    body: QuestionCloseDTO,
  }),
  AdaptController(controller.closeQuestion.bind(controller))
);

questionRouter.post(
  '/:questionId/vote',
  JwtAuthAccess(),
  validateRequest({
    body: VoteDTO,
  }),
  AdaptController(controller.voteQuestion.bind(controller))
);

export { questionRouter };
