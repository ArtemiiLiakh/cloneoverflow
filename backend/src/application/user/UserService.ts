import {
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
} from '@application/user/usecases/dtos';

import {
  IUserGetOwnAnswersUseCase,
  IUserGetOwnQuestionsUseCase,
  IUserGetProfileUseCase,
  IUserGetUseCase,
  IUserUpdateUseCase,
} from '@application/user/usecases/types';

export class UserService {
  constructor (
    private GetUseCase: IUserGetUseCase,
    private GetOwnAnswers: IUserGetOwnAnswersUseCase,
    private GetOwnQuestions: IUserGetOwnQuestionsUseCase,
    private GetProfileUseCase: IUserGetProfileUseCase,
    private UpdateUseCase: IUserUpdateUseCase,
  ) {}

  static new ({
    GetUseCase,
    GetOwnAnswers,
    GetOwnQuestions,
    GetProfileUseCase,
    UpdateUseCase,
  }: {
    GetUseCase: IUserGetUseCase,
    GetOwnAnswers: IUserGetOwnAnswersUseCase,
    GetOwnQuestions: IUserGetOwnQuestionsUseCase,
    GetProfileUseCase: IUserGetProfileUseCase,
    UpdateUseCase: IUserUpdateUseCase,
  }): UserService {
    return new UserService(
      GetUseCase,
      GetOwnAnswers,
      GetOwnQuestions,
      GetProfileUseCase,
      UpdateUseCase,
    );
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