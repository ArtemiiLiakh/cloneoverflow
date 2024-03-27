import { UserStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UserUpdateDto {
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