import axios, { AxiosResponse } from 'axios';
import { AuthLoginDTO } from '../dtos/auth.login.dto';
import { AuthSignupDTO } from '../dtos/auth.signup.dto';
import { AuthTokens } from '../types/AuthTokens';
import { MePayload } from '../types/MePayload';
import { WithAuthorisation } from '../../utils/withAuthorisation';
import urls from '../../utils/urls';

export class AuthService {
  static async login(body: AuthLoginDTO): Promise<AuthTokens> {
    const response = await axios.post<AuthLoginDTO, AxiosResponse<AuthTokens>>(
      urls.login, 
      body,
    );

    return response.data;
  }

  static async signup(body: AuthSignupDTO): Promise<AuthTokens> {
    const response = await axios.post<AuthLoginDTO, AxiosResponse<AuthTokens>>(
      urls.signup, 
      body
    );

    return response.data;
  }

  static async getMe(token: string): Promise<MePayload> {
    const response = await axios.get<AuthLoginDTO, AxiosResponse<MePayload>>(
      urls.me, 
      WithAuthorisation(token)
    );

    return response.data;
  }

  static async refreshToken(): Promise<AuthTokens> {
    const response = await axios.post<AuthLoginDTO, AxiosResponse<AuthTokens>>(
      urls.refreshToken, {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
}
