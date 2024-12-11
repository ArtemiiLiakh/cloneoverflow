import { AdaptController } from '@application/adapters/AdaptController';
import { AnswerController } from '@application/controllers/AnswerController';
import { AuthUserStatusValidatorDI } from '@application/di/security/AuthUserStatusValidatorDI';
import { JwtTokenValidatorDI } from '@application/di/security/JwtTokenValidatorDI';
import { answerServiceFacadeDI } from '@application/di/services/AnswerServiceDI';
import { validateRequest } from '@application/middlewares/security/ValidateRequest';
import {
  AnswerCreateDTO,
  AnswersGetAllDTO,
  AnswerUpdateDTO,
  VoteDTO,
} from '@cloneoverflow/common';
import express from 'express';

const answerRouter = express.Router();
const controller = new AnswerController(answerServiceFacadeDI);

answerRouter.get('/', 
  JwtTokenValidatorDI.validateAccess({ optional: true }),
  validateRequest({
    query: AnswersGetAllDTO,
  }),
  AdaptController(controller.getAll.bind(controller)),
);

answerRouter.get('/:answersId', 
  JwtTokenValidatorDI.validateAccess({ optional: true }),
  AuthUserStatusValidatorDI.validate(),
  AdaptController(controller.get.bind(controller)),
);

answerRouter.post('/', 
  JwtTokenValidatorDI.validateAccess(), 
  AuthUserStatusValidatorDI.validate(),
  validateRequest({
    body: AnswerCreateDTO,
  }), 
  AdaptController(controller.create.bind(controller)),
);

answerRouter.patch('/:answerId', 
  JwtTokenValidatorDI.validateAccess(), 
  AuthUserStatusValidatorDI.validate(),
  validateRequest({
    body: AnswerUpdateDTO,
  }), 
  AdaptController(controller.update.bind(controller)),
);

answerRouter.delete('/:answerId',
  JwtTokenValidatorDI.validateAccess(),
  AuthUserStatusValidatorDI.validate(),
  AdaptController(controller.delete.bind(controller)),
);

answerRouter.post('/:answerId/vote', 
  JwtTokenValidatorDI.validateAccess(), 
  AuthUserStatusValidatorDI.validate(),
  validateRequest({ 
    body: VoteDTO,
  }),
  AdaptController(controller.voteAnswer.bind(controller)),
);

export { answerRouter };
