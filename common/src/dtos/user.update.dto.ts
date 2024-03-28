import { IsNotEmpty, IsOptional } from "class-validator";

export class UserUpdateDTO {
  @IsOptional()
  @IsNotEmpty()
  name?: string;
  
  @IsOptional()
  @IsNotEmpty()
  username?: string;
  
  @IsOptional()
  @IsNotEmpty()
  about?: string;
}