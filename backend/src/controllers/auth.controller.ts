import { Response } from 'express';
import { AuthLoginDTO } from '../dtos/auth.login.dto';
import { AuthSignInDTO } from '../dtos/auth.signin.dto';
import { AuthMapper } from '../mappers/auth.mapper';
import { AuthService } from '../services/auth.service';
import { RequestBody } from '../utils/types/Requests';

export class AuthController {
  constructor (
    private authService = new AuthService(),
    private authMapper = new AuthMapper(),
  ) {}

  async login ({ body }: RequestBody<AuthLoginDTO>, res: Response) {
    const user = await this.authService.login(body);
    res.send(this.authMapper.login(user));
  }

  async signin ({ body }: RequestBody<AuthSignInDTO>, res: Response) {
    const user = await this.authService.signin(body);
    res.send(this.authMapper.signin(user));
  } 
}