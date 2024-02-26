import { Request, Response } from 'express';
import { AuthLoginDTO } from '../dtos/auth.login.dto';
import { AuthSignInDTO } from '../dtos/auth.signin.dto';
import { AuthService } from '../services/auth.service';
import { AuthRequest, RequestWithBody } from '../types/Requests';
import { AccessTokenResponse } from '../responses/accessToken.response';
import { TokenPayload } from '../types/TokenPayload';
import { AuthChangePasswordDTO } from '../dtos/auth.changePassword.dto';

export class AuthController {
  constructor (
    private authService = new AuthService(),
  ) {}

  async login ({ body }: RequestWithBody<AuthLoginDTO>, res: Response<AccessTokenResponse>) {
    const { access_token, refresh_token } = await this.authService.login(body);
    res
      .cookie('refresh_token', refresh_token, { 
        httpOnly: true, 
        sameSite: 'strict',
        maxAge: 7*24*60*60*1000,
      })
      .send({
        access_token,
      });
  }

  async signin ({ body }: RequestWithBody<AuthSignInDTO>, res: Response<AccessTokenResponse>) {
    const { access_token, refresh_token } = await this.authService.signin(body);
    res
      .cookie('refresh_token', refresh_token, { 
        httpOnly: true, 
        sameSite: 'strict',
        maxAge: 7*24*60*60*1000,
      })
      .send({
        access_token,
      });
  } 

  me (req: AuthRequest, res: Response<TokenPayload>) {
    res.send(req.body._user);
  }

  async refreshToken (req: Request, res: Response<AccessTokenResponse>) {
    const access_token = await this.authService.refreshToken(req.cookies['refresh_token'])
    res.send(access_token);
  }

  async changePassword (req: AuthRequest<AuthChangePasswordDTO>, res: Response) {
    await this.authService.changePassword(req.body._user.userId, req.body);
    res.send({
      message: 'ok',
    });
  }
}