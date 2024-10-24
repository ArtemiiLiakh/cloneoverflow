import { AuthForgotPasswordDTO, AuthForgotPasswordResolveDTO, AuthLoginDTO, AuthSignupDTO } from "@cloneoverflow/common";
import { AuthServiceFacade } from "../auth/AuthServiceFacade";
import { WithAuth, WithBody } from "./types/Request";
import { CoreResponse } from "./types/Response";
import { UserGetUseCase } from "@core/service/user/usecase/get";

export class AuthController {
  constructor (
    private authService: AuthServiceFacade,
    private userGetUseCase: UserGetUseCase,
  ) {}
  
  async login(req: WithBody<AuthLoginDTO>, res: CoreResponse) {
    const { user, tokens } = await this.authService.login(req.body);

    res.setCookie('accessToken', tokens.access_token);
    res.setCookie('refreshToken', tokens.refresh_token);

    res.send(user);
  }

  async signup(req: WithBody<AuthSignupDTO>, res: CoreResponse) {
    const { user, tokens } = await this.authService.createAccount(req.body);

    res.setCookie('accessToken', tokens.access_token);
    res.setCookie('refreshToken', tokens.refresh_token);

    res.send(user);
  }

  async getMe(req: WithAuth, res: CoreResponse) {
    const user = await this.userGetUseCase.execute({
      userId: req.user.userId,
    }); 

    res.send(user);
  }

  async refreshToken(req: WithAuth, res: CoreResponse) {
    const { access_token } = await this.authService.refreshToken({
      userId: req.user.userId,
    });
    
    res.setCookie('accessToken', access_token);
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
}