import { ChangePasswordBody } from '@cloneoverflow/common/api/auth';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ApiChangePasswordBody implements ChangePasswordBody {
  @ApiProperty({
    description: 'User\'s email',
    type: 'string',
    format: 'email',
    example: 'example@gmail.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be in email format' })
    email: string;
  
  @ApiPropertyOptional({
    description: 'User\'s old password',
    type: 'string',
    example: 'oldStrongPassword',
  })
  @IsNotEmpty({ message: 'Old password is required' })
    oldPassword: string;
  
  @ApiProperty({
    description: 'Verification code with type \'changePassword\'',
    type: 'string',
    example: 'e0w1Qa',
  })
  @IsNotEmpty({ message: 'Verification code is required' })
    code: string;
  
  @ApiProperty({
    description: 'User\'s new password',
    type: 'string',
    minLength: 8,
    example: 'newStrongPassword',
  })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(8, { message: 'Minimum password length is 8' })
    newPassword: string;
}