import { AnswerController } from '@application/controllers/AnswerController';
import { AuthController } from '@application/controllers/AuthController';
import { QuestionController } from '@application/controllers/QuestionController';
import { SearchController } from '@application/controllers/SearchController';
import { UserController } from '@application/controllers/UserController';

export const ControllerDITokens = {
  UserController: Symbol(UserController.name),
  QuestionController: Symbol(QuestionController.name),
  AnswerController: Symbol(AnswerController.name),
  SearchController: Symbol(SearchController.name),
  AuthController: Symbol(AuthController.name),
};
