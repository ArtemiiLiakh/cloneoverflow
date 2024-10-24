import { AdaptController } from '@app/adapters/AdaptController';
import { UserController } from '@app/controllers/UserController';
import { answerUseCaseDI } from '@app/di/service/AnswerServiceDI';
import { questionUseCasesDI } from '@app/di/service/QuestionServiceDI';
import { userServiceFacadeDI } from '@app/di/service/UserServiceDI';
import { validateRequest } from '@app/middlewares/validation';
import {
  UserGetAnswersDTO,
  UserGetQuestionsDTO,
  UserUpdateDTO
} from '@cloneoverflow/common';
import express from 'express';

const userRouter = express.Router();

const userController = new UserController(
  userServiceFacadeDI, 
  answerUseCaseDI.GetAllUseCase, 
  questionUseCasesDI.GetAllUseCase,
);

userRouter.get(
  '/:userId', 
  AdaptController(userController.getUser.bind(userController))
);

userRouter.get(
  '/:userId/profile', 
  AdaptController(userController.getProfile.bind(userController))
);

userRouter.patch(
  '/:userId', 
  validateRequest({
    body: UserUpdateDTO
  }),
  AdaptController(userController.update.bind(userController))
);

userRouter.get(
  '/:userId/questions', 
  validateRequest({
    query: UserGetQuestionsDTO,
  }),
  AdaptController(userController.getQuestions.bind(userController))
);

userRouter.get(
  '/:userId/answers', 
  validateRequest({
    query: UserGetAnswersDTO,
  }),
  AdaptController(userController.getAnswers.bind(userController))
);

export { userRouter };
