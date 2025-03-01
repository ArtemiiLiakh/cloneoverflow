import { UserServiceFacade } from '@application/facades/UserServiceFacade';
import {
  UserCreateUseCase,
  UserGetProfileUseCase,
  UserGetUseCase,
  UserUpdateUseCase,
} from '@core/services/user';

export const UserUseCaseDITokens = {
  Create: Symbol(UserCreateUseCase.name), 
  Get: Symbol(UserGetUseCase.name), 
  GetProfile: Symbol(UserGetProfileUseCase.name), 
  Update: Symbol(UserUpdateUseCase.name), 
};

export const UserServiceDIToken = Symbol(UserServiceFacade.name);