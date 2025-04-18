import { UserController } from '@application/controllers/UserController';
import { UserServiceFacade } from '@application/service-facades/UserServiceFacade';
import { Provider } from '@nestjs/common';
import { ControllerDITokens } from '../../tokens/ControllerDITokens';
import { UserServiceDIToken } from '../../tokens/services';

export const UserControllerProvider: Provider = {
  provide: ControllerDITokens.UserController,

  useFactory: (
    userService: UserServiceFacade,
  ) => new UserController(userService),

  inject: [
    UserServiceDIToken, 
  ],
};