import { ApiProperty } from '@nestjs/swagger';
import { authPath } from './path';
import { IsEmail, IsNotEmpty } from 'class-validator';

export const BasicLoginPath = authPath+'/login';

export class BasicLoginBody {
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
    example: 'strongPassword'
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

export class BasicLoginResponse {
  @ApiProperty({
    description: 'User\'s id',
    type: 'string',
    format: 'uuid',
    example: 'f1b18767-65e0-463c-8dd2-c7ea8577a684',
  })  
  id: string;

  @ApiProperty({
    description: 'User\'s name',
    type: 'string',
    example: 'Adam'
  })
  name: string;
  
  @ApiProperty({
    description: 'User\'s unique username',
    type: 'string',
    example: 'adamsUsername'
  })
  username: string;
  
  @ApiProperty({
    description: 'User\'s rating',
    type: 'number',
    example: 0
  })
  rating: number;
}