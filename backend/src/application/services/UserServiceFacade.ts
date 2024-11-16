import { UserServiceInput } from '@core/service/user/dto/UserServiceInput';
import { UserServiceOutput } from '@core/service/user/dto/UserServiceOutput';
import {
  IUserCreateUseCase,
  IUserGetProfileUseCase,
  IUserGetUseCase,
  IUserUpdateUseCase,
} from '@core/service/user/types/usecases';

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

  create (payload: UserServiceInput.Create): Promise<UserServiceOutput.Create> {
    return this.userCreateUseCase.execute(payload);
  }

  get (payload: UserServiceInput.Get): Promise<UserServiceOutput.Get> {
    return this.userGetUseCase.execute(payload);
  }

  getProfile (payload: UserServiceInput.GetProfile): Promise<UserServiceOutput.GetProfile> {
    return this.userGetProfileUseCase.execute(payload);
  }

  update (payload: UserServiceInput.Update): Promise<UserServiceOutput.Update> {
    return this.userUpdateUseCase.execute(payload);
  }
}