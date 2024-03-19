import express from "express";
import { UserController } from "../controllers/user.controller";
import { AuthAccess } from "../middlewares/authAccess";
import { validateRequest } from "../middlewares/validation";
import { UserUpdateDto } from "../dtos/user.update.dto";
import { UserGetAnswersDTO } from '../dtos/user.getAnswers.dto';
import { UserGetQuestionsDTO } from '../dtos/user.getQuestions.dto';

const router = express.Router();
const controller = new UserController();

router.patch('/:userId/update', 
  AuthAccess(), 
  validateRequest({
    body: UserUpdateDto,
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