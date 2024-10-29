import { AdaptController } from '@app/adapters/AdaptController';
import { AnswerController } from '@app/controllers/AnswerController';
import { answerServiceFacadeDI } from '@app/di/services/AnswerServiceDI';
import { JwtAuthAccess, JwtGetAuth } from '@app/middlewares/JwtAuthAccess';
import { validateRequest } from '@app/middlewares/validation';
import {
  AnswerCreateDTO,
  AnswerUpdateDTO,
  VoteDTO
} from '@cloneoverflow/common';
import express from 'express';

const answerRouter = express.Router();

const controller = new AnswerController(answerServiceFacadeDI);

answerRouter.get('/:answersId', 
  JwtGetAuth(),
  AdaptController(controller.get.bind(controller)),
);

answerRouter.post('/', 
  JwtAuthAccess(), 
  validateRequest({
    body: AnswerCreateDTO,
  }), 
  AdaptController(controller.create.bind(controller)),
);

answerRouter.patch('/:answerId', 
  JwtAuthAccess(), 
  validateRequest({
    body: AnswerUpdateDTO,
  }), 
  AdaptController(controller.update.bind(controller)),
);

answerRouter.delete('/:answerId',
  JwtAuthAccess(), 
  AdaptController(controller.delete.bind(controller)),
);

answerRouter.post('/:answerId/vote', 
  JwtAuthAccess(), 
  validateRequest({ 
    body: VoteDTO,
  }),
  AdaptController(controller.voteAnswer.bind(controller)),
);

export { answerRouter };
