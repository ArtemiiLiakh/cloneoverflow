import { AuthGetMeMapperOutput } from "@app/adapters/mappers/auth/AuthGetMeMapper";
import { AuthSingUpMapperOutput } from "@app/adapters/mappers/auth/AuthSignUpMapper";
import {
  AuthChangePasswordDTO,
  AuthChangePasswordResolveDTO,
  AuthDeleteDTO,
  AuthForgotPasswordDTO,
  AuthForgotPasswordResolveDTO,
  AuthGetMeResponse,
  AuthLoginDTO,
  AuthLoginResponse,
  AuthSignupDTO,
  AuthSignUpResponse
} from "@cloneoverflow/common";
import { AuthServiceFacade } from "../auth/AuthServiceFacade";
import { WithAuth, WithBody } from "./types/Request";
import { CoreResponse } from "./types/Response";
import { AuthLoginMapperOutput } from "@app/adapters/mappers/auth/AuthLoginMapper";

export class AuthController {
  constructor (
    private authService: AuthServiceFacade,
  ) {}
  
  async login(
    req: WithBody<AuthLoginDTO>, 
    res: CoreResponse<AuthLoginResponse>,
  ) {
    const { user, tokens } = await this.authService.login(req.body);

    res.setCookie('accessToken', tokens.access_token);
    res.setCookie('refreshToken', tokens.refresh_token);

    res.send(AuthLoginMapperOutput(user));
  }

  async signup(
    { body }: WithBody<AuthSignupDTO>, 
    res: CoreResponse<AuthSignUpResponse>,
  ) {
    const { user, tokens } = await this.authService.signUp({
      email: body.email,
      password: body.password,
      name: body.name,
      username: body.username,
      about: body.about ?? '',
    });

    res.setCookie('accessToken', tokens.access_token);
    res.setCookie('refreshToken', tokens.refresh_token);

    res.send(AuthSingUpMapperOutput(user));
  }

  async getMe(
    req: WithAuth, 
    res: CoreResponse<AuthGetMeResponse>
  ) {
    const user = await this.authService.getMe({
      id: req.user.userId,
    }); 

    res.send(AuthGetMeMapperOutput(user));
  }

  async refreshToken(req: WithAuth, res: CoreResponse) {
    const { access_token } = await this.authService.refreshToken({
      userId: req.user.userId,
    });
    
    res.setCookie('accessToken', access_token);
    res.status(204);
    res.send({});
  }

  async changePassword (
    { body, user }: WithAuth & WithBody<AuthChangePasswordDTO>, 
    res: CoreResponse
  ) {
    await this.authService.changePassword({
      userId: user.userId,
      data: body,
    });

    res.status(204);
    res.send({});
  }

  async changePasswordResolve (
    { body, user }: WithAuth & WithBody<AuthChangePasswordResolveDTO>, 
    res: CoreResponse
  ) {
    await this.authService.changePasswordResolve({
      userId: user.userId,
      data: body,
    });

    res.status(204);
    res.send({});
  }

  async forgotPassword({ body }: WithBody<AuthForgotPasswordDTO>, res: CoreResponse) {
    await this.authService.forgotPassword({ email: body.email });
    res.status(204);
    res.send({});
  }

  async forgotPasswordResolve({ body }: WithBody<AuthForgotPasswordResolveDTO>, res: CoreResponse) {
    await this.authService.forgotPasswordResolve(body);
    res.status(204);
    res.send({});
  }

  async deleteAccount({ body, user }: WithAuth & WithBody<AuthDeleteDTO>, res: CoreResponse) {
    const userRes = await this.authService.deleteAccount({ 
      userId: user.userId, 
      creds: {
        email: body.email,
        password: body.password,
      },
    });

    res.send(userRes);
  }
}