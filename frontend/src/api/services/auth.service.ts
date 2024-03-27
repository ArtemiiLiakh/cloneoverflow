import { AuthLoginDTO } from '../dtos/auth.login.dto';
import { AuthSignupDTO } from '../dtos/auth.signup.dto';
import { MePayload } from '../types/MePayload';
import urls from '../../utils/urls';
import { OkMessage } from '../response/ok.message';
import api from '..';
import { AuthChangePasswordDTO } from '../dtos/auth.changePassword.dto';

export class AuthService {
  static async login(body: AuthLoginDTO) {
    return api.post<AuthLoginDTO, MePayload>(
      urls.login, 
      body,
    );
  }

  static async signup(body: AuthSignupDTO): Promise<MePayload> {
    return api.post<AuthLoginDTO, MePayload>(
      urls.signup, 
      body,
    );
  }

  static async getMe() {
    return api.get<AuthLoginDTO, MePayload>(
      urls.me,
    );
  }

  static async refreshToken(): Promise<OkMessage> {
    return api.post<AuthLoginDTO, OkMessage>(
      urls.refreshToken, {},
    );
  }

  static async changePassword(body: AuthChangePasswordDTO): Promise<OkMessage> {
    return api.patch<AuthChangePasswordDTO, OkMessage>(
      urls.changePassword, 
      body,
    );
  }
}
