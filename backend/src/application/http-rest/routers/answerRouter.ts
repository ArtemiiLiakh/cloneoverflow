import { AdaptController } from '@application/adapters/AdaptController';
import { AnswerController } from '@application/controllers/AnswerController';
import { answerServiceFacadeDI } from '@application/di/services/AnswerServiceDI';
import { JwtAuthOptional, JwtAuthAccess } from '@application/middlewares/JwtAuthAccess';
import { validateRequest } from '@application/middlewares/validation';
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
  JwtAuthOptional(),
  validateRequest({
    query: AnswersGetAllDTO,
  }),
  AdaptController(controller.getAll.bind(controller)),
);

answerRouter.get('/:answersId', 
  JwtAuthOptional(),
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
