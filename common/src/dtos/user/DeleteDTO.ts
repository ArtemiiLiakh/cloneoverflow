import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDeleteDTO {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be in email format' })
    email: string;
  
  @IsNotEmpty({ message: 'Password is required' })
    password: string;
}