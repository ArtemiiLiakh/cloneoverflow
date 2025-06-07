import { UserService } from '@application/user/UserService';
import {
  IUserGetOwnAnswersUseCase,
  IUserGetOwnQuestionsUseCase,
  IUserGetProfileUseCase,
  IUserGetUseCase,
  IUserUpdateUseCase,
} from '@application/user/usecases/types';
import { Provider } from '@nestjs/common';
import { UserServiceDIToken, UserUseCaseDITokens } from '../../../tokens/services/UserDITokens';

export const UserServiceProvider: Provider = {
  provide: UserServiceDIToken,
  
  useFactory: (
    GetProfileUseCase: IUserGetProfileUseCase,
    GetUseCase: IUserGetUseCase,
    UpdateUseCase: IUserUpdateUseCase,
    GetOwnAnswers: IUserGetOwnAnswersUseCase,
    GetOwnQuestions: IUserGetOwnQuestionsUseCase,
  ) => UserService.new({
    GetProfileUseCase,
    GetUseCase,
    UpdateUseCase,
    GetOwnAnswers,
    GetOwnQuestions,
  }),

  inject: [
    UserUseCaseDITokens.GetProfile, 
    UserUseCaseDITokens.Get, 
    UserUseCaseDITokens.Update,
    UserUseCaseDITokens.GetOwnAnswers,
    UserUseCaseDITokens.GetOwnQuestions,
  ],
};