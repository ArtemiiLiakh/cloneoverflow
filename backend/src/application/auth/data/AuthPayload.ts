import { UserStatus } from "@cloneoverflow/common";
import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";

export class AuthPayload {
  @IsNotEmpty()
  @IsUUID()
    userId: string;
  
  @IsNotEmpty()
  @IsEnum(UserStatus)
    status: UserStatus;
}