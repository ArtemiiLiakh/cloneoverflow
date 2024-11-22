import { AdaptController } from '@application/adapters/AdaptController';
import { QuestionController } from '@application/controllers/QuestionController';
import { SearchController } from '@application/controllers/SearchController';
import { questionServiceFacadeDI } from '@application/di/services/QuestionServiceDI';
import { searchServiceFacadeDI } from '@application/di/services/SearchServiceDI';
import { JwtAuthOptional, JwtAuthAccess } from '@application/middlewares/JwtAuthAccess';
import { validateRequest } from '@application/middlewares/validation';
import {
  QuestionCloseDTO,
  QuestionCreateDTO,
  QuestionUpdateDTO,
  SearchQuestionsDTO,
  VoteDTO,
} from '@cloneoverflow/common';
import express from 'express';

const questionRouter = express.Router();

const controller = new QuestionController(questionServiceFacadeDI);
const search = new SearchController(searchServiceFacadeDI);

questionRouter.get(
  '/search',
  validateRequest({
    query: SearchQuestionsDTO,
  }),
  AdaptController(search.searchQuestions.bind(search)),
);

questionRouter.get(
  '/:questionId', 
  JwtAuthOptional(),
  AdaptController(controller.get.bind(controller)),
);

questionRouter.post(
  '/', 
  JwtAuthAccess(),
  validateRequest({
    body: QuestionCreateDTO,
  }), 
  AdaptController(controller.create.bind(controller)),
);

questionRouter.patch(
  '/:questionId',
  JwtAuthAccess(),
  validateRequest({
    body: QuestionUpdateDTO,
  }),
  AdaptController(controller.update.bind(controller)),
);

questionRouter.delete(
  '/:questionId',
  JwtAuthAccess(),
  AdaptController(controller.delete.bind(controller)),
);

questionRouter.post(
  '/:questionId/close',
  JwtAuthAccess(),
  validateRequest({
    body: QuestionCloseDTO,
  }),
  AdaptController(controller.closeQuestion.bind(controller)),
);

questionRouter.post(
  '/:questionId/vote',
  JwtAuthAccess(),
  validateRequest({
    body: VoteDTO,
  }),
  AdaptController(controller.voteQuestion.bind(controller)),
);

export { questionRouter };
