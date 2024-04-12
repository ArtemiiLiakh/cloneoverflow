import express from "express";
import { UserController } from "../controllers/user.controller";
import { AuthAccess } from "../middlewares/authAccess";
import { validateRequest } from "../middlewares/validation";
import { UserGetAnswersDTO, UserGetQuestionsDTO, UserUpdateDTO } from '@cloneoverflow/common';

const router = express.Router();
const controller = new UserController();

router.get('/:userId/get', 
  AuthAccess(), 
  controller.get.bind(controller)
);

router.patch('/:userId/update', 
  AuthAccess(), 
  validateRequest({
    body: UserUpdateDTO,
  }), 
  controller.update.bind(controller)
);

router.get(
  '/:userId/profile',
  AuthAccess(),
  controller.getProfile.bind(controller), 
);

router.get('/:userId/answers',
  AuthAccess(),
  validateRequest({
    query: UserGetAnswersDTO,
  }),
  controller.getAnswers.bind(controller),
);

router.get('/:userId/questions',
  AuthAccess(),
  validateRequest({
    query: UserGetQuestionsDTO,
  }),
  controller.getQuestions.bind(controller),
);

export { router as user };