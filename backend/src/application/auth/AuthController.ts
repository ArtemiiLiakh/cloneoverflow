import { OkMessage } from '@common/data/OkMessage';
import { AuthService } from './AuthService';

import {
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
import { WithAuth, WithBody } from '@common/controllers/Request';
import { CoreResponseData } from '@common/controllers/Response';
import { AuthCreateAccountMapperOutput, AuthGetMeMapperOutput, AuthLoginMapperOutput } from './adapters';

export class AuthController {
  constructor (
    private authService: AuthService,
  ) {}
  
  async login (
    req: WithBody<BasicLoginBody>,
  ): Promise<CoreResponseData<BasicLoginResponse>> {
    const { user, tokens } = await this.authService.login(req.body);

    return {
      data: AuthLoginMapperOutput(user),
      status: 201,
      cookies: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      },
    };
  }

  async createAccount (
    { body }: WithBody<CreateAccountBody>, 
  ): Promise<CoreResponseData<CreateAccountResponse>> {
    const { user, tokens } = await this.authService.createAccount({
      email: body.email,
      password: body.password,
      name: body.name,
      username: body.username,
      about: body.about ?? '',
    });
    
    return {
      data: AuthCreateAccountMapperOutput(user),
      status: 201,
      cookies: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      },
    };
  }

  async getMe ({ executor }: WithAuth): Promise<CoreResponseData<GetMeResponse>> {
    const user = await this.authService.getMe({
      executorId: executor.userId,
    }); 

    return {
      data: AuthGetMeMapperOutput(user),
    };
  }

  async refreshToken ({ executor }: WithAuth): Promise<CoreResponseData> {
    const { access_token } = await this.authService.refreshToken({
      userId: executor.userId,
    });
    
    return {
      data: OkMessage,
      status: 201,
      cookies: {
        accessToken: access_token,
      },
    };
  }

  async changePassword (
    { body, executor: user }: WithAuth & WithBody<ChangePasswordBody>, 
  ): Promise<CoreResponseData> {
    await this.authService.changePassword({
      executorId: user.userId,
      code: body.code,
      email: body.email,
      newPassword: body.newPassword,
      oldPassword: body.oldPassword,
    });

    return {
      data: OkMessage,
      status: 204,
    };
  }

  async forgotPassword ({ body }: WithBody<ForgotPasswordBody>): Promise<CoreResponseData> {
    await this.authService.forgotPassword({ 
      email: body.email, 
      code: body.code, 
      newPassword: body.newPassword,
    });

    return {
      data: OkMessage,
      status: 204,
    };
  }

  async deleteAccount ({ body, executor }: WithAuth & WithBody<DeleteAccountBody>): Promise<CoreResponseData> {
    await this.authService.deleteAccount({
      executorId: executor.userId, 
      code: body.code,
      email: body.email,
      password: body.password,
    });

    return {
      data: OkMessage,
      status: 204,
    };
  }

  async sendVerificationCode ({ body }: WithBody<SendVerificationCodeBody>): Promise<CoreResponseData> {
    await this.authService.sendVerificationCode({
      email: body.email,
      codeType: body.codeType,
    });

    return {
      data: OkMessage,
      status: 201,
    };
  }
}