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
  static async login(body: AuthLoginDTO): Promise<GetMeResponse> {
    return api.post(
      urls.login, 
      body,
    ).then((res) => res.data);
  }

  static async signup(body: AuthSignupDTO): Promise<GetMeResponse> {
    return api.post(
      urls.signup, 
      body,
    ).then((res) => res.data);
  }

  static async signout(): Promise<OkResponse> {
    return api.get(
      urls.signout,
    ).then((res) => res.data);
  }

  static async getMe(): Promise<GetMeResponse> {
    return api.get(
      urls.me,
    ).then((res) => res.data);
  }

  static async refreshToken(): Promise<OkResponse> {
    return api.post(
      urls.refreshToken, {},
    ).then((res) => res.data);
  }

  static async changePassword(body: AuthChangePasswordDTO): Promise<OkResponse> {
    return api.patch(
      urls.changePassword, 
      body,
    ).then((res) => res.data);
  }
}
