import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthForgotPasswordDTO {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be in email format' })
    email: string;

  @IsNotEmpty({ message: 'Verification code is required' })
    code: string;
    
  @IsNotEmpty({ message: 'New password is required' })
    newPassword: string;
}