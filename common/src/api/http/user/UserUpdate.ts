import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { userPath } from './paths';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export const UserUpdatePath = userPath;

export class UserUpdateBody {
  @ApiPropertyOptional({
    description: 'User name',
    type: 'string',
    example: 'Adam',
  })
  @IsOptional()
  name?: string;
  
  @ApiPropertyOptional({
    description: 'User unique username',
    type: 'string',
    example: 'adamsUsername',
  })
  @IsOptional()
  username?: string;
  
  @ApiPropertyOptional({
    description: 'User about information',
    type: 'string',
  })
  @IsOptional()
  about?: string;
}