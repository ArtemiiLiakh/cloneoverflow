import { validationMessage } from '@utils/validationUtils';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDeleteDTO {
  @IsNotEmpty(validationMessage('Email is required'))
  @IsEmail({}, validationMessage('Email must be in email format'))
    email: string;
  
  @IsNotEmpty(validationMessage('Password is required'))
    password: string;
}