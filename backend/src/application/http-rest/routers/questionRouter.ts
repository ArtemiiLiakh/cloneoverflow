import { AdaptController } from '@application/adapters/AdaptController';
import { QuestionController } from '@application/controllers/QuestionController';
import { SearchController } from '@application/controllers/SearchController';
import { AuthUserValidatorDI } from '@application/di/security/validators/AuthUserValidatorDI';
import { JwtTokenValidatorDI } from '@application/di/security/validators/JwtTokenValidatorDI';
import { questionServiceFacadeDI } from '@application/di/services/QuestionServiceDI';
import { searchServiceFacadeDI } from '@application/di/services/SearchServiceDI';
import { validateRequest } from '@application/middlewares/security/ValidateRequest';
import { ValidateNumber } from '@application/middlewares/validators/ValidateNumber';
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
  validateRequest({
    params: {
      questionId: ValidateNumber,
    },
  }),
  AdaptController(controller.get.bind(controller)),
);

questionRouter.post(
  '/', 
  JwtTokenValidatorDI.validateAccess(),
  AuthUserValidatorDI.validate(),
  validateRequest({
    body: QuestionCreateDTO,
  }), 
  AdaptController(controller.create.bind(controller)),
);

questionRouter.patch(
  '/:questionId',
  JwtTokenValidatorDI.validateAccess(),
  AuthUserValidatorDI.validate(),
  validateRequest({
    params: {
      questionId: ValidateNumber,
    },
    body: QuestionUpdateDTO,
  }),
  AdaptController(controller.update.bind(controller)),
);

questionRouter.delete(
  '/:questionId',
  JwtTokenValidatorDI.validateAccess(),
  AuthUserValidatorDI.validate(),
  validateRequest({
    params: {
      questionId: ValidateNumber,
    },
  }),
  AdaptController(controller.delete.bind(controller)),
);

questionRouter.post(
  '/:questionId/open',
  JwtTokenValidatorDI.validateAccess(),
  AuthUserValidatorDI.validate(),
  validateRequest({
    params: {
      questionId: ValidateNumber,
    },
  }),
  AdaptController(controller.openQuestion.bind(controller)),
);

questionRouter.post(
  '/:questionId/close',
  JwtTokenValidatorDI.validateAccess(),
  AuthUserValidatorDI.validate(),
  validateRequest({
    params: {
      questionId: ValidateNumber,
    },
    body: QuestionCloseDTO,
  }),
  AdaptController(controller.closeQuestion.bind(controller)),
);

questionRouter.post(
  '/:questionId/vote',
  JwtTokenValidatorDI.validateAccess(),
  AuthUserValidatorDI.validate(),
  validateRequest({
    params: {
      questionId: ValidateNumber,
    },
    body: VoteDTO,
  }),
  AdaptController(controller.voteQuestion.bind(controller)),
);

export { questionRouter };
