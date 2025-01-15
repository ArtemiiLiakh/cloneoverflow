import { AdaptController } from '@application/adapters/AdaptController';
import { QuestionController } from '@application/controllers/QuestionController';
import { SearchController } from '@application/controllers/SearchController';
import { AuthUserStatusValidatorDI } from '@application/di/security/validators/AuthUserStatusValidatorDI';
import { JwtTokenValidatorDI } from '@application/di/security/validators/JwtTokenValidatorDI';
import { questionServiceFacadeDI } from '@application/di/services/QuestionServiceDI';
import { searchServiceFacadeDI } from '@application/di/services/SearchServiceDI';
import { validateRequest } from '@application/middlewares/security/ValidateRequest';
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
  JwtTokenValidatorDI.validateAccess({ optional: true }),
  AuthUserStatusValidatorDI.validate(),
  AdaptController(controller.get.bind(controller)),
);

questionRouter.post(
  '/', 
  JwtTokenValidatorDI.validateAccess(),
  AuthUserStatusValidatorDI.validate(),
  validateRequest({
    body: QuestionCreateDTO,
  }), 
  AdaptController(controller.create.bind(controller)),
);

questionRouter.patch(
  '/:questionId',
  JwtTokenValidatorDI.validateAccess(),
  AuthUserStatusValidatorDI.validate(),
  validateRequest({
    body: QuestionUpdateDTO,
  }),
  AdaptController(controller.update.bind(controller)),
);

questionRouter.delete(
  '/:questionId',
  JwtTokenValidatorDI.validateAccess(),
  AuthUserStatusValidatorDI.validate(),
  AdaptController(controller.delete.bind(controller)),
);

questionRouter.post(
  '/:questionId/open',
  JwtTokenValidatorDI.validateAccess(),
  AuthUserStatusValidatorDI.validate(),
  AdaptController(controller.openQuestion.bind(controller)),
);

questionRouter.post(
  '/:questionId/close',
  JwtTokenValidatorDI.validateAccess(),
  AuthUserStatusValidatorDI.validate(),
  validateRequest({
    body: QuestionCloseDTO,
  }),
  AdaptController(controller.closeQuestion.bind(controller)),
);

questionRouter.post(
  '/:questionId/vote',
  JwtTokenValidatorDI.validateAccess(),
  AuthUserStatusValidatorDI.validate(),
  validateRequest({
    body: VoteDTO,
  }),
  AdaptController(controller.voteQuestion.bind(controller)),
);

export { questionRouter };
