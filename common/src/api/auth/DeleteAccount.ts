import { authPath } from './path';

export const DeleteAccountPath = authPath+'/account';

export interface DeleteAccountBody {
  code: string;
  email: string;
  password: string;
}