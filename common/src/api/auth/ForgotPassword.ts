import { authPath } from './path';

export const ForgotPasswordPath = authPath+'/account/forgot/password';

export interface ForgotPasswordBody {
  email: string;
  code: string;
  newPassword: string;
}