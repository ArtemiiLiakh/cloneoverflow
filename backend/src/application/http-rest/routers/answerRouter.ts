import { AdaptController } from '@application/adapters/AdaptController';
import { AnswerController } from '@application/controllers/AnswerController';
import { AuthUserValidatorDI } from '@application/di/security/validators/AuthUserValidatorDI';
import { JwtAuthValidatorDI } from '@application/di/security/validators/JwtAuthValidatorDI';
import { answerServiceFacadeDI } from '@application/di/services/AnswerServiceDI';
import { validateRequest } from '@application/middlewares/validators/ValidateRequest';
import { ValidateNumber } from '@application/middlewares/validators/data/ValidateNumber';
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
  validateRequest({
    query: AnswersGetAllDTO,
  }),
  AdaptController(controller.getAll.bind(controller)),
);

answerRouter.get('/:answerId', 
  validateRequest({
    params: {
      answerId: ValidateNumber,
    },
  }),
  AdaptController(controller.get.bind(controller)),
);

answerRouter.post('/', 
  JwtAuthValidatorDI.validateAccess(), 
  AuthUserValidatorDI.validate(),
  validateRequest({
    body: AnswerCreateDTO,
  }), 
  AdaptController(controller.create.bind(controller)),
);

answerRouter.patch('/:answerId', 
  JwtAuthValidatorDI.validateAccess(), 
  AuthUserValidatorDI.validate(),
  validateRequest({
    params: {
      answerId: ValidateNumber,
    },
    body: AnswerUpdateDTO,
  }), 
  AdaptController(controller.update.bind(controller)),
);

answerRouter.delete('/:answerId',
  JwtAuthValidatorDI.validateAccess(),
  AuthUserValidatorDI.validate(),
  validateRequest({
    params: {
      answerId: ValidateNumber,
    },
  }),
  AdaptController(controller.delete.bind(controller)),
);

answerRouter.post('/:answerId/vote', 
  JwtAuthValidatorDI.validateAccess(), 
  AuthUserValidatorDI.validate(),
  validateRequest({
    params: {
      answerId: ValidateNumber,
    },
    body: VoteDTO,
  }),
  AdaptController(controller.voteAnswer.bind(controller)),
);

answerRouter.get('/:answerId/voter', 
  JwtAuthValidatorDI.validateAccess(), 
  AuthUserValidatorDI.validate(),
  validateRequest({
    params: {
      answerId: ValidateNumber,
    },
  }),
  AdaptController(controller.getVoter.bind(controller)),
);

export { answerRouter };
