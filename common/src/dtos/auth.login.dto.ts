import { IsEmail, IsNotEmpty } from 'class-validator';
import { validationMessage } from '../utils/validationUtils';

export class AuthLoginDTO {
  @IsNotEmpty(validationMessage('Email is required'))
  @IsEmail({}, validationMessage('Email must be in email format'))
    email: string;
  
  @IsNotEmpty(validationMessage('Password is required'))
    password: string;
}