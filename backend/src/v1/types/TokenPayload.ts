import { UserStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { JwtPayload } from 'jsonwebtoken';

export class TokenPayload implements JwtPayload {
  @IsNotEmpty()
  @IsUUID()
    userId: string;
  
  @IsNotEmpty()
  @IsEnum(UserStatus)
    status: UserStatus;
}