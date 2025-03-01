import { UserStatusEnum } from '@cloneoverflow/common';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export enum TokenTypeEnum {
  ACCESS='access',
  REFRESH='refresh'
}

export class TokenPayload {
  @IsNotEmpty()
  @IsUUID()
    userId: string;

  @IsNotEmpty()
  @IsEnum(UserStatusEnum)
    status: UserStatusEnum;

  @IsNotEmpty()
  @IsEnum(TokenTypeEnum)
    type?: TokenTypeEnum;
}