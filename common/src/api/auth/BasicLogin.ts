import { authPath } from './path';

export const BasicLoginPath = authPath+'/login';

export interface BasicLoginBody {
  email: string;
  password: string;
}

export interface BasicLoginResponse {
  id: string;
  name: string;
  username: string;
  rating: number;
}