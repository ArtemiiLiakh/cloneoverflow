import { IsNotEmpty } from 'class-validator';
import { validationMessage } from '../utils/validationUtils';

export class AuthChangePasswordResolveDTO {
  @IsNotEmpty(validationMessage('Verification code is required'))
    code: string;

  @IsNotEmpty(validationMessage('New password is required'))
    newPassword: string;
}