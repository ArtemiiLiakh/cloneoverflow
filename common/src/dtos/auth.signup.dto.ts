import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { validationMessage } from '../utils/validationUtils';

export class AuthSignupDTO {
  @IsNotEmpty(validationMessage('Email is required'))
  @IsEmail({}, validationMessage('Email must be in email format'))
    email: string;
  
  @IsNotEmpty(validationMessage('Password is required'))
    password: string;

  @IsNotEmpty(validationMessage('Name is required'))
    name: string;
  
  @IsNotEmpty(validationMessage('Username is required'))
    username: string;

  @IsOptional()
    about?: string;
}