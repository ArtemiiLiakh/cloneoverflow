import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class AuthSignupDTO {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be in email format' })
    email: string;
  
  @IsNotEmpty({ message: 'Password is required' })
    password: string;

  @IsNotEmpty({ message: 'Name is required' })
    name: string;
  
  @IsNotEmpty({ message: 'Username is required' })
    username: string;

  @IsOptional()
  @MaxLength(500, { message: 'Maximum length of description is 500 symbols' })
    about?: string;
}