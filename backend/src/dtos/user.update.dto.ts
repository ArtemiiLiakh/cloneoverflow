import { UserStatus } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional } from "class-validator";

export class UserUpdateDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  about?: string;

  @IsOptional()
  @IsNumber()
  reputation?: number;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}