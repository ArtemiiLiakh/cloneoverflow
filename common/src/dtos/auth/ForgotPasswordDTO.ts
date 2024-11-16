import { validationMessage } from '@utils/validationUtils';
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthForgotPasswordDTO {
  @IsNotEmpty(validationMessage('Email is required'))
  @IsEmail({}, validationMessage('Email must be in email format'))
    email: string;

  @IsNotEmpty(validationMessage('Verification code is required'))
    code: string;
    
  @IsNotEmpty(validationMessage('New password is required'))
    newPassword: string;
}