import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthChangePasswordDTO {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be in email format' })
    email: string;

  @IsNotEmpty({ message: 'Old password is required' })
    oldPassword: string;

  @IsNotEmpty({ message: 'Verification code is required' })
    code: string;

  @IsNotEmpty({ message: 'New password is required' })
    newPassword: string;
}