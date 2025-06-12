import { UserUpdateBody } from '@cloneoverflow/common/api/user';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ApiUserUpdateBody implements UserUpdateBody {
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