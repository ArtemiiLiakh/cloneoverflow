import { ApiProperty } from '@nestjs/swagger';
import { authPath } from './path';

export const GetMePath = authPath+'/account/me';

export class GetMeResponse {
  @ApiProperty({
    description: 'User\'s id',
    type: 'string',
    format: 'uuid',
    example: 'f1b18767-65e0-463c-8dd2-c7ea8577a684',
  })  
  id: string;

  @ApiProperty({
    description: 'User\'s name',
    type: 'string',
    example: 'Adam'
  })
  name: string;
  
  @ApiProperty({
    description: 'User\'s unique username',
    type: 'string',
    example: 'adamsUsername'
  })
  username: string;
  
  @ApiProperty({
    description: 'User\'s rating',
    type: 'number',
    example: 0
  })
  rating: number;
}