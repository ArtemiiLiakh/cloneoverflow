import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ValidateByFunction } from '../../utils/validationConstraints';

export class SignupData {
  @IsNotEmpty({ message: 'Name is required' })
    name: string;
  
  @IsNotEmpty({ message: 'Username is required' })
    username: string;
  
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
    email: string;
  
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'Password must contain at least 8 characters, one letter and one number' })
    password: string;

  @IsNotEmpty({ message: 'Repeat password is required' })
  @ValidateByFunction((_, o) => o.password === o.repeatPassword, { message: 'Passwords do not match' })
    repeatPassword: string;
}