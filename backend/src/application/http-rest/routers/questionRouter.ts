import { AdaptController } from '@app/adapters/AdaptController';
import { QuestionController } from '@app/controllers/QuestionController';
import { SearchController } from '@app/controllers/SearchController';
import { questionServiceFacadeDI } from '@app/di/services/QuestionServiceDI';
import { searchServiceFacadeDI } from '@app/di/services/SearchServiceDI';
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

const controller = new QuestionController(questionServiceFacadeDI);
const search = new SearchController(searchServiceFacadeDI);

questionRouter.get(
  '/search',
  validateRequest({
    query: SearchQuestionsDTO,
  }),
  AdaptController(search.searchQuestions.bind(search))
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
