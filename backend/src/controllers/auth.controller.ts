import { Request, Response } from 'express';
import { AuthLoginDTO } from '../dtos/auth.login.dto';
import { AuthSignupDTO } from '../dtos/auth.signup.dto';
import { AuthService } from '../services/auth.service';
import { AuthReq, Body } from '../types/Requests';
import { AccessTokenResponse } from '../responses/accessToken.response';
import { AuthChangePasswordDTO } from '../dtos/auth.changePassword.dto';
import { AuthMapper } from '../mappers/auth.mapper';
import { GetMeResponse } from '../responses/auth.getMe.response';

export class AuthController {
  constructor (
    private authService = new AuthService(),
    private authMapper = new AuthMapper(),
  ) {}

  async login ({ body }: Body<AuthLoginDTO>, res: Response<AccessTokenResponse>) {
    const tokens = await this.authService.login(body);
    res.send(tokens);
  }

  async signup ({ body }: Body<AuthSignupDTO>, res: Response<AccessTokenResponse>) {
    const tokens = await this.authService.signup(body);
    res.send(tokens);
  } 

  async getMe (req: AuthReq, res: Response<GetMeResponse>) {
    const user = await this.authService.getMe(req.body._user.userId);
    res.send(this.authMapper.getMe(user));
  }

  async refreshToken (req: Request, res: Response<AccessTokenResponse>) {
    const { access_token } = await this.authService.refreshToken(req.cookies['refresh_token'])
    res.send({
      access_token,
      refresh_token: req.cookies['refresh_token'],
    });
  }

  async changePassword (req: AuthReq & Body<AuthChangePasswordDTO>, res: Response) {
    await this.authService.changePassword(req.body._user.userId, req.body);
    res.send({
      message: 'ok',
    });
  }
}