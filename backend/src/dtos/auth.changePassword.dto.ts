import { IsNotEmpty } from 'class-validator';

export class AuthChangePasswordDTO {
  @IsNotEmpty()
    oldPassword: string;
  
  @IsNotEmpty()
    newPassword: string;
}