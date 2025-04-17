import { UserServiceFacade } from '@application/facades/UserServiceFacade';
import {
  IUserCreateUseCase,
  IUserGetOwnAnswersUseCase,
  IUserGetOwnQuestionsUseCase,
  IUserGetProfileUseCase,
  IUserGetUseCase,
  IUserUpdateUseCase,
} from '@core/services/user/types';
import { Provider } from '@nestjs/common';
import { UserServiceDIToken, UserUseCaseDITokens } from '../../../tokens/services/UserDITokens';

export const UserServiceProvider: Provider = {
  provide: UserServiceDIToken,
  
  useFactory: (
    CreateUseCase: IUserCreateUseCase,
    GetProfileUseCase: IUserGetProfileUseCase,
    GetUseCase: IUserGetUseCase,
    UpdateUseCase: IUserUpdateUseCase,
    GetOwnAnswers: IUserGetOwnAnswersUseCase,
    GetOwnQuestions: IUserGetOwnQuestionsUseCase,
  ) => UserServiceFacade.new({
    CreateUseCase,
    GetProfileUseCase,
    GetUseCase,
    UpdateUseCase,
    GetOwnAnswers,
    GetOwnQuestions,
  }),

  inject: [
    UserUseCaseDITokens.Create, 
    UserUseCaseDITokens.GetProfile, 
    UserUseCaseDITokens.Get, 
    UserUseCaseDITokens.Update,
    UserUseCaseDITokens.GetOwnAnswers,
    UserUseCaseDITokens.GetOwnQuestions,
  ],
};