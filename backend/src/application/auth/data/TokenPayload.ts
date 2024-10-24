import { IsEnum, IsIn, IsNotEmpty } from 'class-validator';
import { AuthPayload } from './AuthPayload';

export enum TokenType {
  ACCESS='access',
  REFRESH='refresh'
}

export class TokenPayload extends AuthPayload {
  @IsNotEmpty()
  @IsEnum(TokenType)
    type: TokenType;
}