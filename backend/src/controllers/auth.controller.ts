import { Request, Response } from 'express';
import { AuthLoginDTO } from '../dtos/auth.login.dto';
import { AuthSignupDTO } from '../dtos/auth.signup.dto';
import { AuthService } from '../services/auth.service';
import { AuthRequest, Body } from '../types/Requests';
import { AccessTokenResponse } from '../responses/accessToken.response';
import { AuthChangePasswordDTO } from '../dtos/auth.changePassword.dto';
import { AuthMapper } from '../mappers/auth.mapper';
import { GetMeResponse } from '../responses/auth.getMe.response';
import config from '../config';
import { OkResponse } from '../responses/ok.response';

export class AuthController {
  constructor (
    private authService = new AuthService(),
    private authMapper = new AuthMapper(),
  ) {}

  async login ({ body }: Body<AuthLoginDTO>, res: Response<GetMeResponse>) {
    const { access_token, refresh_token, user } = await this.authService.login(body);
    res.cookie('access_token', access_token, config.accessTokenConfig)
      .cookie('refresh_token', refresh_token, config.refreshTokenConfig)
      .send(this.authMapper.getMe(user));
  }

  async signup ({ body }: Body<AuthSignupDTO>, res: Response<GetMeResponse>) {
    console.log(body);
    const { access_token, refresh_token, user } = await this.authService.signup(body);
    res.cookie('access_token', access_token, config.accessTokenConfig)
      .cookie('refresh_token', refresh_token, config.refreshTokenConfig)
      .send(this.authMapper.getMe(user));
  } 

  async getMe ({ body: { _user } }: AuthRequest, res: Response<GetMeResponse>) {
    const user = await this.authService.getMe(_user.userId);
    res.send(this.authMapper.getMe(user));
  }

  async refreshToken ({ cookies }: Request, res: Response<OkResponse>) {
    const { access_token } = await this.authService.refreshToken(cookies['refresh_token'])
    res.cookie('access_token', access_token, config.accessTokenConfig).send({
      message: 'ok',
    });
  }

  async changePassword ({ body }: AuthRequest & Body<AuthChangePasswordDTO>, res: Response<OkResponse>) {
    await this.authService.changePassword(body._user.userId, body);
    res.send({
      message: 'ok',
    });
  }
}