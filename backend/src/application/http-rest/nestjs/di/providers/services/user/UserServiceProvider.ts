import { UserServiceFacade } from '@application/facades/UserServiceFacade';
import {
  IUserCreateUseCase,
  IUserGetProfileUseCase,
  IUserGetUseCase,
  IUserUpdateUseCase,
} from '@core/services/user/types';
import { Provider } from '@nestjs/common';
import { UserServiceDIToken, UserUseCaseDITokens } from '../../../tokens/services/UserDITokens';

export const UserServiceProvider: Provider = {
  provide: UserServiceDIToken,
  
  useFactory: (
    userCreateUseCase: IUserCreateUseCase,
    userGetProfileUseCase: IUserGetProfileUseCase,
    userGetUseCase: IUserGetUseCase,
    userUpdateUseCase: IUserUpdateUseCase,
  ) => UserServiceFacade.new({
    userCreateUseCase,
    userGetProfileUseCase,
    userGetUseCase,
    userUpdateUseCase,
  }),

  inject: [
    UserUseCaseDITokens.Create, 
    UserUseCaseDITokens.GetProfile, 
    UserUseCaseDITokens.Get, 
    UserUseCaseDITokens.Update,
  ],
};