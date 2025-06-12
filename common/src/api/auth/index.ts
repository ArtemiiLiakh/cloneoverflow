export * from './BasicLogin';
export * from './ChangePassword';
export * from './CreateAccount';
export * from './DeleteAccount';
export * from './ForgotPassword';
export * from './GetMe';
export * from './RefreshToken';
export * from './SendVerificationCode';

import { BasicLoginPath } from './BasicLogin';
import { ChangePasswordPath } from './ChangePassword';
import { CreateAccountPath } from './CreateAccount';
import { DeleteAccountPath } from './DeleteAccount';
import { ForgotPasswordPath } from './ForgotPassword';
import { GetMePath } from './GetMe';
import { authPath } from './path';
import { RefreshTokenPath } from './RefreshToken';
import { SendVerificationCodePath } from './SendVerificationCode';
import { SignOutPath } from './SignOut';

export const AuthPaths = {
  MainPath: authPath,
  BasicLogin: BasicLoginPath,
  ChangePassword: ChangePasswordPath,
  CreateAccount: CreateAccountPath,
  DeleteAccount: DeleteAccountPath,
  ForgotPassword: ForgotPasswordPath,
  GetMe: GetMePath,
  SignOut: SignOutPath,
  RefeshToken: RefreshTokenPath,
  SendVerificationCode: SendVerificationCodePath,
}