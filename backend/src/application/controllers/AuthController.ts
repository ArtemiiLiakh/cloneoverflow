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

import { AuthServiceFacade } from '../service-facades/AuthServiceFacade';
import { WithAuth, WithBody } from './types/Request';
import { CoreResponse } from './types/Response';

export class AuthController {
  constructor (
    private authService: AuthServiceFacade,
  ) {}
  
  async login (
    req: WithBody<AuthLoginDTO>, 
    res: CoreResponse<AuthLoginResponse>,
  ): Promise<void> {
    const { user, tokens } = await this.authService.login(req.body);

    res.setCookie('accessToken', tokens.access_token);
    res.setCookie('refreshToken', tokens.refresh_token);

    res.status(200);
    res.send(AuthLoginMapperOutput(user));
  }

  async createAccount (
    { body }: WithBody<AuthSignupDTO>, 
    res: CoreResponse<AuthSignUpResponse>,
  ): Promise<void> {
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
  ): Promise<void> {
    const user = await this.authService.getMe({
      executorId: executor.userId,
    }); 

    res.send(AuthGetMeMapperOutput(user));
  }

  async refreshToken ({ executor }: WithAuth, res: CoreResponse): Promise<void> {
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
  ): Promise<void> {
    await this.authService.changePassword({
      executorId: user.userId,
      code: body.code,
      email: body.email,
      newPassword: body.newPassword,
      oldPassword: body.oldPassword,
    });

    res.status(200);
    res.send({ message: 'ok' });
  }

  async forgotPassword ({ body }: WithBody<AuthForgotPasswordDTO>, res: CoreResponse): Promise<void> {
    await this.authService.forgotPassword({ 
      email: body.email, 
      code: body.code, 
      newPassword: body.newPassword,
    });

    res.status(200);
    res.send({ message: 'ok' });
  }

  async deleteAccount ({ body, executor }: WithAuth & WithBody<AuthDeleteAccountDTO>, res: CoreResponse): Promise<void> {
    const userRes = await this.authService.deleteAccount({
      executorId: executor.userId, 
      code: body.code,
      email: body.email,
      password: body.password,
    });

    res.send(userRes);
  }

  async sendVerificationCode ({ body }: WithBody<AuthVerificationCodeDTO>, res: CoreResponse): Promise<void> {
    await this.authService.sendVerificationCode({
      email: body.email,
      codeType: body.codeType,
    });

    res.status(201);
    res.send({ message: 'ok' });
  }

  async checkVerificationCode ({ body }: WithBody<CheckVerificationCodeDTO>, res: CoreResponse): Promise<void> {
    await this.authService.checkVerificationCode({
      email: body.email,
      code: body.code,
      codeType: body.codeType,
    });

    res.send({ message: 'ok' });
  }
}