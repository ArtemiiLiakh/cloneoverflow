import {
  UserCreateInput,
  UserCreateOutput,
  UserGetInput,
  UserGetOutput,
  UserGetProfileInput,
  UserGetProfileOutput,
  UserUpdateInput,
  UserUpdateOutput,
} from '@core/services/user/dtos';

import {
  IUserCreateUseCase,
  IUserGetProfileUseCase,
  IUserGetUseCase,
  IUserUpdateUseCase,
} from '@core/services/user/types';

export class UserServiceFacade {
  constructor (
    private userCreateUseCase: IUserCreateUseCase,
    private userGetUseCase: IUserGetUseCase,
    private userGetProfileUseCase: IUserGetProfileUseCase,
    private userUpdateUseCase: IUserUpdateUseCase,
  ) {}

  static new ({
    userCreateUseCase,
    userGetUseCase,
    userGetProfileUseCase,
    userUpdateUseCase,
  }: {
    userCreateUseCase: IUserCreateUseCase,
    userGetUseCase: IUserGetUseCase,
    userGetProfileUseCase: IUserGetProfileUseCase,
    userUpdateUseCase: IUserUpdateUseCase,
  }) {
    return new UserServiceFacade(
      userCreateUseCase,
      userGetUseCase,
      userGetProfileUseCase,
      userUpdateUseCase,
    );
  }

  create (payload: UserCreateInput): Promise<UserCreateOutput> {
    return this.userCreateUseCase.execute(payload);
  }

  get (payload: UserGetInput): Promise<UserGetOutput> {
    return this.userGetUseCase.execute(payload);
  }

  getProfile (payload: UserGetProfileInput): Promise<UserGetProfileOutput> {
    return this.userGetProfileUseCase.execute(payload);
  }

  update (payload: UserUpdateInput): Promise<UserUpdateOutput> {
    return this.userUpdateUseCase.execute(payload);
  }
}