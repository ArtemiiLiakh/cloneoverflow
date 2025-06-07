import { ApiProperty } from '@nestjs/swagger';
import { authPath } from './path';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export const ForgotPasswordPath = authPath+'/account/forgot/password';

export class ForgotPasswordBody {
  @ApiProperty({
    description: 'User\'s email',
    type: 'string',
    format: 'email',
    example: 'example@gmail.com'
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be in email format' })
  email: string;
  
  @ApiProperty({
    description: 'Verification code with \'forgotPassword\' type',
    type: 'string',
    example: 'Eu01rh'
  })
  @IsNotEmpty({ message: 'Verification code is required' })
  code: string;
  
  @ApiProperty({
    description: 'User\'s new password',
    type: 'string',
    minLength: 8,
    example: 'newStrongPassword',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Minimum password length is 8' })
  newPassword: string;
}