import { UserStatusEnum } from '@cloneoverflow/common';
import { UserGetParams, UserGetResponse } from '@cloneoverflow/common/api/user';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ApiUserGetParams implements UserGetParams {
  @ApiProperty({
    description: 'User id',
    type: 'string',
    format: 'uuid',
    example: '79907ffc-a63e-4295-a64c-9d5569690113',
  })
  @IsNotEmpty({ message: 'User id is required' })
  @IsUUID('all', { message: 'User id must be in uuid format' })
    userId: string;
}

export class ApiUserGetResponse implements UserGetResponse {
  @ApiProperty({
    description: 'User id',
    type: 'string',
    format: 'uuid',
    example: '6876206a-6b5f-42d3-88f9-b41735adeddc',
  })
    id: string;
  
  @ApiProperty({
    description: 'User name',
    type: 'string',
    example: 'Adam',
  })
    name: string;
  
  @ApiProperty({
    description: 'User unique username',
    type: 'string',
    example: 'adamsUsername',
  })
    username: string;
  
  @ApiProperty({
    description: 'User rating',
    type: 'number',
    example: 0,
  })
    rating: number;
  
  @ApiProperty({
    description: 'User status',
    type: 'string',
    enum: UserStatusEnum,
    example: UserStatusEnum.USER,
  })
    status: UserStatusEnum;
  
  @ApiProperty({
    description: 'User creation date',
    type: 'string',
    example: new Date(0).toISOString(),
  })
    createdAt: string;

  @ApiProperty({
    description: 'Last date user was updated',
    type: 'string',
    example: new Date(0).toISOString(),
  })
    updatedAt: string;
}