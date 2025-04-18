import { UserServiceFacade } from '@application/service-facades/UserServiceFacade';
import {
  UserCreateUseCase,
  UserGetOwnAnswersUseCase,
  UserGetOwnQuestionsUseCase,
  UserGetProfileUseCase,
  UserGetUseCase,
  UserUpdateUseCase,
} from '@core/services/user';

export const UserUseCaseDITokens = {
  Create: Symbol(UserCreateUseCase.name), 
  Get: Symbol(UserGetUseCase.name), 
  GetProfile: Symbol(UserGetProfileUseCase.name), 
  Update: Symbol(UserUpdateUseCase.name), 
  GetOwnAnswers: Symbol(UserGetOwnAnswersUseCase.name),
  GetOwnQuestions: Symbol(UserGetOwnQuestionsUseCase.name),
};

export const UserServiceDIToken = Symbol(UserServiceFacade.name);