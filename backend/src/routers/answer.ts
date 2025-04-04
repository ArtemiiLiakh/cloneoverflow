import { AnswerController } from '@/controllers/answer.controller';
import { AuthAccess, GetAuth } from '@/middlewares/authAccess';
import { validateRequest } from '@/middlewares/validation';
import { answerService } from '@/services';
import { AnswerCreateDTO, AnswerUpdateDTO, VoteDTO } from '@cloneoverflow/common';
import express from 'express';

const answer = express.Router();
const controller = new AnswerController(answerService);

answer.get('/:answersId/get', 
  GetAuth(),
  controller.get.bind(controller)
);

answer.post('/create', 
  AuthAccess(), 
  validateRequest({
    body: AnswerCreateDTO,
  }), 
  controller.create.bind(controller)
);

answer.patch('/:answerId/update', 
  AuthAccess(), 
  validateRequest({
    body: AnswerUpdateDTO,
  }), 
  controller.update.bind(controller)
);

answer.delete('/:answerId/delete',
  AuthAccess(),
  controller.delete.bind(controller)
);

answer.patch('/:answerId/vote', 
  AuthAccess(),
  validateRequest({ 
    body: VoteDTO,
  }),
  controller.voteAnswer.bind(controller),
);

export { answer };
