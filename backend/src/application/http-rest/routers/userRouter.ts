import { AdaptController } from '@application/adapters/AdaptController';
import { UserController } from '@application/controllers/UserController';
import { answerUseCaseDI } from '@application/di/services/AnswerServiceDI';
import { questionUseCasesDI } from '@application/di/services/QuestionServiceDI';
import { userServiceFacadeDI } from '@application/di/services/UserServiceDI';
import { JwtAuthAccess } from '@application/middlewares/JwtAuthAccess';
import { validateRequest } from '@application/middlewares/validateRequest';
import {
  UserGetAnswersDTO,
  UserGetQuestionsDTO,
  UserUpdateDTO,
} from '@cloneoverflow/common';
import express from 'express';

const userRouter = express.Router();

const userController = new UserController(
  userServiceFacadeDI, 
  answerUseCaseDI.GetAllUseCaseDI, 
  questionUseCasesDI.GetAllUseCaseDI,
);

userRouter.get(
  '/:userId', 
  AdaptController(userController.getUser.bind(userController)),
);

userRouter.get(
  '/:userId/profile', 
  AdaptController(userController.getProfile.bind(userController)),
);

userRouter.patch(
  '/:userId', 
  JwtAuthAccess(),
  validateRequest({
    body: UserUpdateDTO,
  }),
  AdaptController(userController.update.bind(userController)),
);

userRouter.get(
  '/:userId/questions', 
  validateRequest({
    query: UserGetQuestionsDTO,
  }),
  AdaptController(userController.getQuestions.bind(userController)),
);

userRouter.get(
  '/:userId/answers', 
  validateRequest({
    query: UserGetAnswersDTO,
  }),
  AdaptController(userController.getAnswers.bind(userController)),
);

export { userRouter };
