import { ApiProperty } from '@nestjs/swagger';

export class ExceptionMessage {
  @ApiProperty({
    description: 'Endpoint path'
  })
  path: string;
  
  @ApiProperty({
    description: 'Error status code'
  })
  status: number;
  
  @ApiProperty({
    description: 'Error name'
  })
  error: string;
  
  @ApiProperty({
    description: 'Error message'
  })
  message: string | string[];
  
  @ApiProperty({
    description: 'Date when the error was made'
  })
  timestamp: string;
}