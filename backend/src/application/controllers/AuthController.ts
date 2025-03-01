import {
  AuthCreateAccountMapperOutput,
  AuthGetMeMapperOutput,
  AuthLoginMapperOutput,
} from '@application/adapters/mappers/auth';

import {
  AuthChangePasswordDTO,
  AuthDeleteAccountDTO,
  AuthForgotPasswordDTO,
  AuthGetMeResponse,
  AuthLoginDTO,
  AuthLoginResponse,
  AuthSignupDTO,
  AuthSignUpResponse,
  AuthVerificationCodeDTO,
  CheckVerificationCodeDTO,
} from '@cloneoverflow/common';

import { AuthServiceFacade } from '../facades/AuthServiceFacade';
import { WithAuth, WithBody } from './types/Request';
import { CoreResponse } from './types/Response';

export class AuthController {
  constructor (
    private authService: AuthServiceFacade,
  ) {}
  
  async login (
    req: WithBody<AuthLoginDTO>, 
    res: CoreResponse<AuthLoginResponse>,
  ) {
    const { user, tokens } = await this.authService.login(req.body);

    res.setCookie('accessToken', tokens.access_token);
    res.setCookie('refreshToken', tokens.refresh_token);

    res.status(200);
    res.send(AuthLoginMapperOutput(user));
  }

  async createAccount (
    { body }: WithBody<AuthSignupDTO>, 
    res: CoreResponse<AuthSignUpResponse>,
  ) {
    const { user, tokens } = await this.authService.createAccount({
      email: body.email,
      password: body.password,
      name: body.name,
      username: body.username,
      about: body.about ?? '',
    });
    
    res.setCookie('accessToken', tokens.access_token);
    res.setCookie('refreshToken', tokens.refresh_token);

    res.status(201);
    res.send(AuthCreateAccountMapperOutput(user));
  }

  async getMe (
    { executor }: WithAuth, 
    res: CoreResponse<AuthGetMeResponse>,
  ) {
    const user = await this.authService.getMe({
      executorId: executor.userId,
    }); 

    res.send(AuthGetMeMapperOutput(user));
  }

  async refreshToken ({ executor }: WithAuth, res: CoreResponse) {
    const { access_token } = await this.authService.refreshToken({
      userId: executor.userId,
    });
    
    res.setCookie('accessToken', access_token);

    res.status(201);
    res.send({ message: 'ok' });
  }

  async changePassword (
    { body, executor: user }: WithAuth & WithBody<AuthChangePasswordDTO>, 
    res: CoreResponse,
  ) {
    await this.authService.changePassword({
      executorId: user.userId,
      code: body.code,
      email: body.email,
      newPassword: body.newPassword,
      oldPassword: body.oldPassword,
    });

    res.send({ message: 'ok' });
  }

  async forgotPassword ({ body }: WithBody<AuthForgotPasswordDTO>, res: CoreResponse) {
    await this.authService.forgotPassword({ 
      email: body.email, 
      code: body.code, 
      newPassword: body.newPassword,
    });

    res.status(200);
    res.send({ message: 'ok' });
  }

  async deleteAccount ({ body, executor }: WithAuth & WithBody<AuthDeleteAccountDTO>, res: CoreResponse) {
    const userRes = await this.authService.deleteAccount({
      executorId: executor.userId, 
      code: body.code,
      email: body.email,
      password: body.password,
    });

    res.send(userRes);
  }

  async sendVerificationCode ({ body }: WithBody<AuthVerificationCodeDTO>, res: CoreResponse) {
    await this.authService.sendVerificationCode({
      email: body.email,
      codeType: body.codeType,
    });

    res.status(201);
    res.send({ message: 'ok' });
  }

  async checkVerificationCode ({ body }: WithBody<CheckVerificationCodeDTO>, res: CoreResponse) {
    await this.authService.checkVerificationCode({
      email: body.email,
      code: body.code,
      codeType: body.codeType,
    });

    res.send({ message: 'ok' });
  }
}