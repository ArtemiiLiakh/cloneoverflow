import { UserController } from '@/controllers/user.controller';
import { AuthAccess } from '@/middlewares/authAccess';
import { validateRequest } from '@/middlewares/validation';
import { userService } from '@/services';
import { UserDeleteDTO, UserGetAnswersDTO, UserGetQuestionsDTO, UserUpdateDTO } from '@cloneoverflow/common';
import express from "express";

const user = express.Router();
const controller = new UserController(userService);

user.get('/:userId/get', 
  AuthAccess(), 
  controller.get.bind(controller)
);

user.patch('/:userId/update', 
  AuthAccess(), 
  validateRequest({
    body: UserUpdateDTO,
  }), 
  controller.update.bind(controller)
);

user.get(
  '/:userId/profile',
  AuthAccess(),
  controller.getProfile.bind(controller), 
);

user.get('/:userId/answers',
  AuthAccess(),
  validateRequest({
    query: UserGetAnswersDTO,
  }),
  controller.getAnswers.bind(controller),
);

user.get('/:userId/questions',
  AuthAccess(),
  validateRequest({
    query: UserGetQuestionsDTO,
  }),
  controller.getQuestions.bind(controller),
);

user.delete('/:userId/delete',
  AuthAccess(),
  validateRequest({
    body: UserDeleteDTO,
  }),
  controller.delete.bind(controller),
);

export { user };
