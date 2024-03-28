import {
  AuthChangePasswordDTO,
  AuthLoginDTO,
  AuthSignupDTO,
  GetMeResponse,
  OkResponse
} from '@clone-overflow/common';
import api from '..';
import urls from '../../utils/urls';

export class AuthService {
  static async login(body: AuthLoginDTO) {
    return api.post<AuthLoginDTO, GetMeResponse>(
      urls.login, 
      body,
    );
  }

  static async signup(body: AuthSignupDTO): Promise<GetMeResponse> {
    return api.post<AuthLoginDTO, GetMeResponse>(
      urls.signup, 
      body,
    );
  }

  static async getMe() {
    return api.get<AuthLoginDTO, GetMeResponse>(
      urls.me,
    );
  }

  static async refreshToken(): Promise<OkResponse> {
    return api.post<AuthLoginDTO, OkResponse>(
      urls.refreshToken, {},
    );
  }

  static async changePassword(body: AuthChangePasswordDTO): Promise<OkResponse> {
    return api.patch<AuthChangePasswordDTO, OkResponse>(
      urls.changePassword, 
      body,
    );
  }
}
