import { AdaptController } from '@application/adapters/AdaptController';
import { AnswerController } from '@application/controllers/AnswerController';
import { AuthUserValidatorDI } from '@application/di/security/validators/AuthUserValidatorDI';
import { JwtTokenValidatorDI } from '@application/di/security/validators/JwtTokenValidatorDI';
import { answerServiceFacadeDI } from '@application/di/services/AnswerServiceDI';
import { validateRequest } from '@application/middlewares/security/ValidateRequest';
import { ValidateUUID } from '@application/middlewares/validators';
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

answerRouter.get('/:answerId', 
  JwtTokenValidatorDI.validateAccess({ optional: true }),
  AuthUserValidatorDI.validate(),
  validateRequest({
    params: {
      answerId: ValidateUUID,
    },
  }),
  AdaptController(controller.get.bind(controller)),
);

answerRouter.post('/', 
  JwtTokenValidatorDI.validateAccess(), 
  AuthUserValidatorDI.validate(),
  validateRequest({
    params: {
      answerId: ValidateUUID,
    },
    body: AnswerCreateDTO,
  }), 
  AdaptController(controller.create.bind(controller)),
);

answerRouter.patch('/:answerId', 
  JwtTokenValidatorDI.validateAccess(), 
  AuthUserValidatorDI.validate(),
  validateRequest({
    params: {
      answerId: ValidateUUID,
    },
    body: AnswerUpdateDTO,
  }), 
  AdaptController(controller.update.bind(controller)),
);

answerRouter.delete('/:answerId',
  JwtTokenValidatorDI.validateAccess(),
  AuthUserValidatorDI.validate(),
  AdaptController(controller.delete.bind(controller)),
);

answerRouter.post('/:answerId/vote', 
  JwtTokenValidatorDI.validateAccess(), 
  AuthUserValidatorDI.validate(),
  validateRequest({ 
    params: {
      answerId: ValidateUUID,
    },
    body: VoteDTO,
  }),
  AdaptController(controller.voteAnswer.bind(controller)),
);

export { answerRouter };
