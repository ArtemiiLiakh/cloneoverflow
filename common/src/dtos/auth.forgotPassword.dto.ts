import { IsEmail, IsNotEmpty } from "class-validator";
import { validationMessage } from "../utils/validationUtils";

export class AuthForgotPasswordDTO {
  @IsNotEmpty(validationMessage('Email cannot be empty'))
  @IsEmail({}, validationMessage('Email must be in email format'))
    email: string;
}