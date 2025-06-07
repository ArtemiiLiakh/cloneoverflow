import { UserController } from '@application/user/UserController';
import { UserService } from '@application/user/UserService';
import { Provider } from '@nestjs/common';
import { ControllerDITokens } from '@web/di/tokens/ControllerDITokens';
import { UserServiceDIToken } from '@web/di/tokens/services';

export const UserControllerProvider: Provider = {
  provide: ControllerDITokens.UserController,

  useFactory: (
    userService: UserService,
  ) => new UserController(userService),

  inject: [
    UserServiceDIToken, 
  ],
};