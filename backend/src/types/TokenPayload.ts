import { IsNotEmpty, IsUUID } from 'class-validator';
import { JwtPayload } from 'jsonwebtoken';

export class TokenPayload implements JwtPayload {
  @IsNotEmpty()
  @IsUUID()
    userId: string;
  
  @IsNotEmpty()
    name: string;
  
  @IsNotEmpty()
    username: string;
}