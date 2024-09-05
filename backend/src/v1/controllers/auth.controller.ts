import config from '@/v1/config';
import { AuthMapper } from '@/v1/mappers/auth.mapper';
import { AuthService } from '@/v1/services/auth.service';
import { AuthRequest, Body } from '@/v1/types/Requests';
import {
  AuthChangePasswordDTO,
  AuthForgotPasswordDTO,
  AuthForgotPasswordResolveDTO,
  AuthLoginDTO,
  AuthSignupDTO,
  GetMeResponse,
  OkResponse
} from '@cloneoverflow/common';
import { Request, Response } from 'express';

export class AuthController {
  constructor (
    private authService: AuthService,
    private authMapper = new AuthMapper(),
  ) {}

  async login ({ body }: Body<AuthLoginDTO>, res: Response<GetMeResponse>) {
    const { access_token, refresh_token, user } = await this.authService.login(body);
    res.status(201)
      .cookie('access_token', access_token, config.authTokens.accessToken)
      .cookie('refresh_token', refresh_token, config.authTokens.refreshToken)
      .send(this.authMapper.getMe(user));
  }

  async signup ({ body }: Body<AuthSignupDTO>, res: Response<GetMeResponse>) {
    const { access_token, refresh_token, user } = await this.authService.signup(body);
    res.status(201)
      .cookie('access_token', access_token, config.authTokens.accessToken)
      .cookie('refresh_token', refresh_token, config.authTokens.refreshToken)
      .send(this.authMapper.getMe(user));
  } 

  async signout (req: Request, res: Response<OkResponse>) {
    res.cookie('access_token', '', { maxAge: 0 })
      .cookie('refresh_token', '', { maxAge: 0, httpOnly: true })
      .send({
        message: 'ok',
      });
  }

  async getMe ({ body: { _user } }: AuthRequest, res: Response<GetMeResponse>) {
    const user = await this.authService.getMe(_user.userId);
    res.send(this.authMapper.getMe(user));
  }

  async refreshToken ({ cookies }: Request, res: Response<OkResponse>) {
    const { access_token } = await this.authService.refreshToken(cookies['refresh_token'])
    res.cookie('access_token', access_token, config.authTokens.accessToken).send({
      message: 'ok',
    });
  }

  async changePassword ({ body }: AuthRequest & Body<AuthChangePasswordDTO>, res: Response<OkResponse>) {
    await this.authService.changePassword(body._user.userId, body);
    res.status(201).send({
      message: 'ok',
    });
  }

  async forgotPassword({ body }: Body<AuthForgotPasswordDTO>, res: Response<OkResponse>) {
    await this.authService.forgotPassword(body.email);
    res.status(201).send({
      message: 'ok',
    });
  }

  async forgotPasswordResolve({ body }: AuthRequest & Body<AuthForgotPasswordResolveDTO>, res: Response<OkResponse>) {
    await this.authService.forgotPasswordResolve(body);
    res.status(201).send({
      message: 'ok',
    });
  }
}