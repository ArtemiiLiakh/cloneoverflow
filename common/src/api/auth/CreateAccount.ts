import { authPath } from './path';

export const CreateAccountPath = authPath+'/account';

export interface CreateAccountBody {
  email: string;
  password: string;
  name: string;
  username: string;
  about?: string;
}

export interface CreateAccountResponse {
  id: string;
}