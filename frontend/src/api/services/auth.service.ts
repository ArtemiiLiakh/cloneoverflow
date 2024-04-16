import {
  AuthChangePasswordDTO,
  AuthLoginDTO,
  AuthSignupDTO,
  GetMeResponse,
  OkResponse
} from '@cloneoverflow/common';
import api from '..';
import urls from '../urls';
import { AxiosResponse } from 'axios';

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

  static async signout(): Promise<AxiosResponse<OkResponse>> {
    return api.get<OkResponse>(
      urls.signout,
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
