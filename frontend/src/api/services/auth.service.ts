import {
  BasicLoginBody,
  BasicLoginResponse,
  ChangePasswordBody,
  CreateAccountBody,
  CreateAccountResponse,
  GetMeResponse,
} from '@cloneoverflow/common/api/auth';
import api from '..';
import urls from '../urls';

export class AuthService {
  static async login(body: BasicLoginBody): Promise<BasicLoginResponse> {
    return api.post(
      urls.login, 
      body,
    ).then((res) => res.data);
  }

  static async createAccount(body: CreateAccountBody): Promise<CreateAccountResponse> {
    return api.post(
      urls.createAccount, 
      body,
    ).then((res) => res.data);
  }

  static async signout(): Promise<void> {
    return api.delete(
      urls.signout,
    ).then((res) => res.data);
  }

  static async getMe(): Promise<GetMeResponse> {
    return api.get(
      urls.me,
    ).then((res) => res.data);
  }

  static async refreshToken(): Promise<void> {
    return api.post(
      urls.refreshToken,
    ).then((res) => res.data);
  }

  static async changePassword(body: ChangePasswordBody): Promise<void> {
    return api.patch(
      urls.changePassword, 
      body,
    ).then((res) => res.data);
  }
}
