import { IsEmail, IsNotEmpty } from "class-validator";
import { validationMessage } from "../utils/validationUtils";

export class AuthForgotPasswordResolveDTO {
  @IsNotEmpty(validationMessage('Email is required'))
  @IsEmail({}, validationMessage('Email must be in email format'))
    email: string;

  @IsNotEmpty(validationMessage('Resolve code is required'))
    code: string;
    
  @IsNotEmpty(validationMessage('New password is required'))
    newPassword: string;
}