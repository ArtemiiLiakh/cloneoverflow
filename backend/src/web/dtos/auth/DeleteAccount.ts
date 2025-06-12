import { DeleteAccountBody } from '@cloneoverflow/common/api/auth';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ApiDeleteAccountBody implements DeleteAccountBody {
  @ApiProperty({
    description: 'Verification code with type \'deleteAccount\'',
    type: 'string',
    example: 'e0w1Qa',
  })
  @IsNotEmpty({ message: 'Verification code is required' })
    code: string;

  @ApiProperty({
    description: 'User\'s email',
    type: 'string',
    format: 'email',
    example: 'example@gmail.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be in email format' })
    email: string;
  
  @ApiProperty({
    description: 'User\'s password',
    type: 'string',
    example: 'strongPassword',
  })
  @IsNotEmpty({ message: 'Password is required' })
    password: string;
}