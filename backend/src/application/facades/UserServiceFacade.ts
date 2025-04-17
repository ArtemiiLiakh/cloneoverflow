import {
  UserCreateInput,
  UserCreateOutput,
  UserGetInput,
  UserGetOutput,
  UserGetOwnAnswersInput,
  UserGetOwnAnswersOutput,
  UserGetOwnQuestionsInput,
  UserGetOwnQuestionsOutput,
  UserGetProfileInput,
  UserGetProfileOutput,
  UserUpdateInput,
  UserUpdateOutput,
} from '@core/services/user/dtos';

import {
  IUserCreateUseCase,
  IUserGetOwnAnswersUseCase,
  IUserGetOwnQuestionsUseCase,
  IUserGetProfileUseCase,
  IUserGetUseCase,
  IUserUpdateUseCase,
} from '@core/services/user/types';

export class UserServiceFacade {
  constructor (
    private CreateUseCase: IUserCreateUseCase,
    private GetUseCase: IUserGetUseCase,
    private GetOwnAnswers: IUserGetOwnAnswersUseCase,
    private GetOwnQuestions: IUserGetOwnQuestionsUseCase,
    private GetProfileUseCase: IUserGetProfileUseCase,
    private UpdateUseCase: IUserUpdateUseCase,
  ) {}

  static new ({
    CreateUseCase,
    GetUseCase,
    GetOwnAnswers,
    GetOwnQuestions,
    GetProfileUseCase,
    UpdateUseCase,
  }: {
    CreateUseCase: IUserCreateUseCase,
    GetUseCase: IUserGetUseCase,
    GetOwnAnswers: IUserGetOwnAnswersUseCase,
    GetOwnQuestions: IUserGetOwnQuestionsUseCase,
    GetProfileUseCase: IUserGetProfileUseCase,
    UpdateUseCase: IUserUpdateUseCase,
  }): UserServiceFacade {
    return new UserServiceFacade(
      CreateUseCase,
      GetUseCase,
      GetOwnAnswers,
      GetOwnQuestions,
      GetProfileUseCase,
      UpdateUseCase,
    );
  }

  create (payload: UserCreateInput): Promise<UserCreateOutput> {
    return this.CreateUseCase.execute(payload);
  }

  get (payload: UserGetInput): Promise<UserGetOutput> {
    return this.GetUseCase.execute(payload);
  }

  getOwnAnswers (payload: UserGetOwnAnswersInput): Promise<UserGetOwnAnswersOutput> {
    return this.GetOwnAnswers.execute(payload);
  }

  getOwnQuestions (payload: UserGetOwnQuestionsInput): Promise<UserGetOwnQuestionsOutput> {
    return this.GetOwnQuestions.execute(payload);
  }

  getProfile (payload: UserGetProfileInput): Promise<UserGetProfileOutput> {
    return this.GetProfileUseCase.execute(payload);
  }

  update (payload: UserUpdateInput): Promise<UserUpdateOutput> {
    return this.UpdateUseCase.execute(payload);
  }
}