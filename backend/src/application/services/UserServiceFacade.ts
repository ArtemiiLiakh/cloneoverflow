import { UserServiceInput } from "@core/service/user/dto/UserServiceInput";
import { UserServiceOutput } from "@core/service/user/dto/UserServiceOutput";
import {
  IUserGetProfileUseCase,
  IUserGetUseCase,
  IUserUpdateUseCase
} from "@core/service/user/types/usecases";

export class UserServiceFacade {
  constructor (
    private userGetUseCase: IUserGetUseCase,
    private userGetProfileUseCase: IUserGetProfileUseCase,
    private userUpdateUseCase: IUserUpdateUseCase,
  ) {}

  get(payload: UserServiceInput.Get): Promise<UserServiceOutput.Get> {
    return this.userGetUseCase.execute(payload);
  }

  getProfile(payload: UserServiceInput.GetProfile): Promise<UserServiceOutput.GetProfile> {
    return this.userGetProfileUseCase.execute(payload);
  }

  update(payload: UserServiceInput.Update): Promise<UserServiceOutput.Update> {
    return this.userUpdateUseCase.execute(payload);
  }
}