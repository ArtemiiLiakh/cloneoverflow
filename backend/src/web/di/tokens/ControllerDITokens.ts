import { AnswerController } from '@application/answer/AnswerController';
import { AuthController } from '@application/auth/AuthController';
import { QuestionController } from '@application/question/QuestionController';
import { SearchController } from '@application/search/SearchController';
import { UserController } from '@application/user/UserController';

export const ControllerDITokens = {
  UserController: Symbol(UserController.name),
  QuestionController: Symbol(QuestionController.name),
  AnswerController: Symbol(AnswerController.name),
  SearchController: Symbol(SearchController.name),
  AuthController: Symbol(AuthController.name),
};
