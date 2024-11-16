import { IsOptional, IsString } from "class-validator";

export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  name?: string;
  
  @IsOptional()
  @IsString()
  username?: string;
  
  @IsOptional()
  @IsString()
  about?: string;
}