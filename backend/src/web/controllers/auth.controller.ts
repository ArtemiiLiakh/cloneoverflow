import {
  AuthPaths,
  BasicLoginBody,
  BasicLoginResponse,
  ChangePasswordBody,
  CreateAccountBody,
  CreateAccountResponse,
  DeleteAccountBody,
  ForgotPasswordBody,
  GetMeResponse,
  SendVerificationCodeBody,
} from '@cloneoverflow/common/api/auth';

import { AuthController } from '@application/auth/AuthController';
import { ExecutorPayload, TokenTypeEnum } from '@application/auth/data';
import { UserUnauthorized } from '@application/auth/exceptions';
import { AlreadyRegisteredException } from '@application/auth/exceptions/AlreadyRegistered';
import { LoginException } from '@application/auth/exceptions/LoginException';
import { CoreResponse } from '@common/controllers/Response';
import { UserWithEmailNotFound } from '@core/user/exceptions/UserWithEmailNotFound';
import { Body, Controller, Delete, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiEndpointDocumentation } from '../decorators/apiEndpoint.decorator';
import { Auth } from '../decorators/auth.decorator';
import { Executor } from '../decorators/executor.decorator';
import { CoreRes } from '../decorators/response.decorator';
import { ControllerDITokens } from '../di/tokens/ControllerDITokens';

@ApiTags('auth')
@Controller()
export class NestAuthController {
  constructor (
    @Inject(ControllerDITokens.AuthController) private readonly authController: AuthController,
  ) {}
  
  @Post(AuthPaths.BasicLogin)
  @ApiEndpointDocumentation({
    path: AuthPaths.BasicLogin,
    summary: 'Login to existing account',
    operationId: 'Login',
    response: {
      statusCode: 201,
      type: BasicLoginResponse,
    },
    exceptions: [
      {
        title: 'User with this email not found',
        exception: new UserWithEmailNotFound(),
      },
      {
        title: 'Wrong email or password',
        exception: new LoginException(),
      },
    ],
    useDataValidation: true,
  })
  login (
    @Body() body: BasicLoginBody, 
    @CoreRes() res: CoreResponse,
  ): Promise<BasicLoginResponse> {
    return res.process(this.authController.login({ body }));
  }

  @Post(AuthPaths.CreateAccount)
  @ApiEndpointDocumentation({
    path: AuthPaths.CreateAccount,
    summary: 'Create a new account using email and password',
    operationId: 'Create account',
    response: {
      statusCode: 201,
      type: CreateAccountResponse,
    },
    exceptions: {
      title: 'Already registered',
      exception: new AlreadyRegisteredException(),
    },
    useDataValidation: true,
  })
  createAccount (
    @Body() body: CreateAccountBody, 
    @CoreRes() res: CoreResponse,
  ): Promise<CreateAccountResponse> {
    return res.process(this.authController.createAccount({ body }));
  }

  @Delete(AuthPaths.DeleteAccount)
  @Auth()
  @ApiEndpointDocumentation({
    path: AuthPaths.DeleteAccount,
    summary: 'Delete account with verification code',
    operationId: 'Delete account',
    response: {
      statusCode: 204,
      description: 'Account successfully deleted',
    },
    exceptions: {
      title: 'Wrong email or password',
      exception: new LoginException(),
    },
    useAuthValidation: true,
    useDataValidation: true,
    useCodeValidation: true,
  })
  async deleteAccount (
    @Executor() executor: ExecutorPayload, 
    @Body() body: DeleteAccountBody, 
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    await res.process(this.authController.deleteAccount({ 
      executor,
      body,
    }));
  }

  @Get(AuthPaths.GetMe)
  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @ApiEndpointDocumentation({
    path: AuthPaths.GetMe,
    summary: 'Get information of authorized user',
    operationId: 'Get me',
    response: {
      type: GetMeResponse,
      statusCode: 200,
    },
    useAuthValidation: {
      access: true,
    },
    exceptions: {
      title: 'User unauthorized',
      exception: new UserUnauthorized(),
    },
  })
  me (
    @Executor() executor: ExecutorPayload, 
    @CoreRes() res: CoreResponse,
  ): Promise<GetMeResponse> {
    return res.process(this.authController.getMe({ executor }));
  }

  @Post(AuthPaths.RefeshToken)
  @Auth({ tokenType: TokenTypeEnum.REFRESH })
  @ApiEndpointDocumentation({
    path: AuthPaths.RefeshToken,
    summary: 'Refresh current access token',
    operationId: 'Refresh token',
    useAuthValidation: {
      refresh: true,
    },
    response: {
      statusCode: 204,
      description: 'Access token was updated',
    },
  })
  async refreshToken (
    @Executor() executor: ExecutorPayload, 
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    await res.process(this.authController.refreshToken({ executor }));
  }

  @Post(AuthPaths.ChangePassword)
  @Auth()
  @ApiEndpointDocumentation({
    path: AuthPaths.ChangePassword,
    summary: 'Change account password',
    operationId: 'Change password',
    response: {
      statusCode: 204,
      description: 'Password successfully changed',
    },
    exceptions: {
      title: 'Wrong email or password',
      exception: new LoginException(),
    },
    useAuthValidation: true,
    useDataValidation: true,
    useCodeValidation: true,
  })
  async changePassword (
    @Executor() executor: ExecutorPayload,
    @Body() body: ChangePasswordBody, 
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    await res.process(this.authController.changePassword({ executor, body }));
  }

  @Post(AuthPaths.ForgotPassword)
  @ApiEndpointDocumentation({
    path: AuthPaths.ForgotPassword,
    summary: 'Restore forgotten password',
    operationId: 'Forgot password',
    response: {
      statusCode: 204,
      description: 'Password was successfully restored',
    },
    useDataValidation: true,
    useCodeValidation: true,
    exceptions: {
      title: 'User with provided email not found',
      exception: new UserWithEmailNotFound(),
    },
  })
  async forgotPassword (
    @Body() body: ForgotPasswordBody, 
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    await res.process(this.authController.forgotPassword({ body }));
  }

  @ApiEndpointDocumentation({
    path: AuthPaths.SendVerificationCode,
    summary: 'Send verification code',
    operationId: 'Send verification code',
    response: {
      statusCode: 204,
      description: 'Verification code was sent to provided email',
    },
    exceptions: {
      title: 'User with provided email not found',
      exception: new UserWithEmailNotFound(),
    },
    useDataValidation: true,
  })
  @Post(AuthPaths.SendVerificationCode)
  async sendVerificationCode (
    @Body() body: SendVerificationCodeBody, 
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    await res.process(this.authController.sendVerificationCode({ body }));
  }
}