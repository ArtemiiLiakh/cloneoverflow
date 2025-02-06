import { AdaptController } from '@application/adapters/AdaptController';
import { UserController } from '@application/controllers/UserController';
import { AuthUserValidatorDI } from '@application/di/security/validators/AuthUserValidatorDI';
import { JwtTokenValidatorDI } from '@application/di/security/validators/JwtTokenValidatorDI';
import { answerUseCaseDI } from '@application/di/services/AnswerServiceDI';
import { questionUseCasesDI } from '@application/di/services/QuestionServiceDI';
import { userServiceFacadeDI } from '@application/di/services/UserServiceDI';
import { ValidateUUID } from '@application/middlewares/validators/data';
import { validateRequest } from '@application/middlewares/validators/ValidateRequest';
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
  validateRequest({
    params: {
      userId: ValidateUUID,
    },
  }),
  AdaptController(userController.getUser.bind(userController)),
);

userRouter.get(
  '/:userId/profile', 
  validateRequest({
    params: {
      userId: ValidateUUID,
    },
  }),
  AdaptController(userController.getProfile.bind(userController)),
);

userRouter.patch(
  '/', 
  JwtTokenValidatorDI.validateAccess(),
  AuthUserValidatorDI.validate(),
  validateRequest({
    body: UserUpdateDTO,
  }),
  AdaptController(userController.update.bind(userController)),
);

userRouter.get(
  '/:userId/questions', 
  validateRequest({
    params: {
      userId: ValidateUUID,
    },
    query: UserGetQuestionsDTO,
  }),
  AdaptController(userController.getQuestions.bind(userController)),
);

userRouter.get(
  '/:userId/answers', 
  validateRequest({
    params: {
      userId: ValidateUUID,
    },
    query: UserGetAnswersDTO,
  }),
  AdaptController(userController.getAnswers.bind(userController)),
);

export { userRouter };
