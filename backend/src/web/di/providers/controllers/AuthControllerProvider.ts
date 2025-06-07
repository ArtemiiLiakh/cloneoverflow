import { AuthController } from '@application/auth/AuthController';
import { AuthService } from '@application/auth/AuthService';
import { Provider } from '@nestjs/common';
import { ControllerDITokens } from '@web/di/tokens/ControllerDITokens';
import { AuthServiceDIToken } from '@web/di/tokens/services';

export const AuthControllerProvider: Provider = {
  provide: ControllerDITokens.AuthController,
  useFactory: (authService: AuthService) => new AuthController(authService),
  inject: [AuthServiceDIToken],
};