import { AuthController } from '@application/controllers/AuthController';
import { CoreResponse } from '@application/controllers/types/Response';
import { ExecutorPayload, TokenTypeEnum } from '@application/services/auth/data';
import { AuthChangePasswordDTO, AuthDeleteAccountDTO, AuthForgotPasswordDTO, AuthLoginDTO, AuthSignupDTO, AuthVerificationCodeDTO, CheckVerificationCodeDTO } from '@cloneoverflow/common';
import { Body, Controller, Delete, Get, Inject, Patch, Post } from '@nestjs/common';
import { Auth } from '../decorators/auth.decorator';
import { Executor } from '../decorators/executor.decorator';
import { CoreRes } from '../decorators/response.decorator';
import { ControllerDITokens } from '../di/tokens/ControllerDITokens';

@Controller('/auth')
export class NestAuthController {
  constructor (
    @Inject(ControllerDITokens.AuthController) private authController: AuthController,
  ) {}
  
  @Post('login')
  login (
    @Body() body: AuthLoginDTO, 
    @CoreRes() res: CoreResponse,
  ) {
    return this.authController.login({ body }, res);
  }

  @Post('/account')
  createAccount (
    @Body() body: AuthSignupDTO, 
    @CoreRes() res: CoreResponse,
  ) {
    return this.authController.createAccount({ body }, res);
  }

  @Auth()
  @Delete('/account')
  deleteAccount (
    @Executor() executor: ExecutorPayload, 
    @Body() body: AuthDeleteAccountDTO, 
    @CoreRes() res: CoreResponse,
  ) {
    return this.authController.deleteAccount({ 
      executor,
      body,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Get('/account/me')
  me (
    @Executor() executor: ExecutorPayload, 
    @CoreRes() res: CoreResponse,
  ) {
    return this.authController.getMe({ executor }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.REFRESH })
  @Post('/refresh')
  refreshToken (
    @Executor() executor: ExecutorPayload, 
    @CoreRes() res: CoreResponse,
  ) {
    return this.authController.refreshToken({ executor }, res);
  }

  @Auth()
  @Patch('/account/password')
  changePassword (
    @Executor() executor: ExecutorPayload,
    @Body() body: AuthChangePasswordDTO, 
    @CoreRes() res: CoreResponse,
  ) {
    return this.authController.changePassword({ executor, body }, res);
  }

  @Post('/account/forgotPassword')
  forgotPassword (
    @Body() body: AuthForgotPasswordDTO, 
    @CoreRes() res: CoreResponse,
  ) {
    return this.authController.forgotPassword({ body }, res);
  }

  @Post('/verificationCode')
  sendVerificationCode (
    @Body() body: AuthVerificationCodeDTO, 
    @CoreRes() res: CoreResponse,
  ) {
    return this.authController.sendVerificationCode({ body }, res);
  }

  @Get('/verificationCode')
  checkVerificationCode (
    @Body() body: CheckVerificationCodeDTO, 
    @CoreRes() res: CoreResponse,
  ) {
    return this.authController.checkVerificationCode({ body }, res);
  }
}