import {
  UserGetMapperOutput,
  UserGetProfileMapperOutput,
  UserUpdateMapperOutput,
} from '@application/adapters/mappers/user';

import {
  UserGetProfileResponse,
  UserGetResponse,
  UserUpdateDTO,
  UserUpdateResponse,
} from '@cloneoverflow/common';

import { UserServiceFacade } from '@application/facades/UserServiceFacade';
import { WithAuth, WithBody, WithParams } from './types/Request';
import { CoreResponse } from './types/Response';

export class UserController {
  constructor (
    private userService: UserServiceFacade,
  ) {}

  async getUser (
    { params }: WithParams<{ userId: string }>, 
    res: CoreResponse<UserGetResponse>,
  ) {
    const user = await this.userService.get({
      userId: params.userId,
    });

    res.send(UserGetMapperOutput(user));
  }

  async getProfile (
    { params }: WithParams<{ userId: string }>, 
    res: CoreResponse<UserGetProfileResponse>,
  ) {
    const profile = await this.userService.getProfile({
      userId: params.userId,
    });
    res.send(UserGetProfileMapperOutput(profile));
  }

  async update (
    { executor, body }: WithAuth & WithBody<UserUpdateDTO>, 
    res: CoreResponse<UserUpdateResponse>,
  ) {
    const user = await this.userService.update({
      executorId: executor.userId,
      data: body,
    });
    res.send(UserUpdateMapperOutput(user));
  }
}