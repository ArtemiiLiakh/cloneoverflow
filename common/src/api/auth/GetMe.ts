import { authPath } from './path';

export const GetMePath = authPath+'/account/me';

export interface GetMeResponse {
  id: string;
  name: string;
  username: string;
  rating: number;
}