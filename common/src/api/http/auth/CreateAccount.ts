import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { authPath } from './path';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export const CreateAccountPath = authPath+'/account';

export class CreateAccountBody {
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
    description: 'User\'s password',
    type: 'string',
    minLength: 8,
    example: 'strongPassword',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Minimum password length is 8' })
  password: string;
  
  @ApiProperty({
    description: 'User\'s name',
    type: 'string',
    example: 'Adam'
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  
  @ApiProperty({
    description: 'User\'s unique username',
    type: 'string',
    example: 'username'
  })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;
  
  @ApiPropertyOptional({
    description: 'User\'s about information',
    type: 'string',
  })
  @IsOptional()
  about?: string;
}

export class CreateAccountResponse {
  @ApiProperty({
    description: 'User\'s id',
    type: 'string',
    format: 'uuid',
    example: '6fe62af1-ff63-4c2c-bd50-dbe004658bb1'
  })
  id: string;
}