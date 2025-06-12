import { authPath } from './path';

export const ChangePasswordPath = authPath+'/account/password';

export interface ChangePasswordBody {
  email: string;
  oldPassword: string;
  code: string;
  newPassword: string;
}