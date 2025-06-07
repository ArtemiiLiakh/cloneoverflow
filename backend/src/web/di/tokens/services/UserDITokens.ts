import { UserService } from '@application/user/UserService';
import {
  UserGetOwnAnswersUseCase,
  UserGetOwnQuestionsUseCase,
  UserGetProfileUseCase,
  UserGetUseCase,
  UserUpdateUseCase,
} from '@application/user/usecases';

export const UserUseCaseDITokens = {
  Get: Symbol(UserGetUseCase.name), 
  GetProfile: Symbol(UserGetProfileUseCase.name), 
  Update: Symbol(UserUpdateUseCase.name), 
  GetOwnAnswers: Symbol(UserGetOwnAnswersUseCase.name),
  GetOwnQuestions: Symbol(UserGetOwnQuestionsUseCase.name),
};

export const UserServiceDIToken = Symbol(UserService.name);