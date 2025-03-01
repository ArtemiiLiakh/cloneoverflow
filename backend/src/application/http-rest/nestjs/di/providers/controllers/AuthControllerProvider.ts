import { Provider } from '@nestjs/common';
import { ControllerDITokens } from '../../tokens/ControllerDITokens';
import { AuthController } from '@application/controllers/AuthController';
import { AuthServiceFacade } from '@application/facades/AuthServiceFacade';
import { AuthServiceDIToken } from '../../tokens/services';

export const AuthControllerProvider: Provider = {
  provide: ControllerDITokens.AuthController,
  useFactory: (authService: AuthServiceFacade) => new AuthController(authService),
  inject: [AuthServiceDIToken],
};