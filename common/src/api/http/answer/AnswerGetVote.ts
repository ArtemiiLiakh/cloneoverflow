import { VoteTypeEnum } from '@enums/VoteType';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { answerPath } from './path';

export const AnswerGetVotePath = answerPath+'/:answerId/vote';

export class AnswerGetVoteParams {
  @ApiProperty({
    description: 'Answer id',
    type: 'string',
    example: '1'
  })
  @IsNotEmpty({ message: 'Answer id is required' })
  @IsNumberString({}, { message: 'Answer id must be a number' })
  answerId: string;
}

export class AnswerGetVoteResponse {
  @ApiProperty({
    description: 'Answer voter id',
    type: 'string',
    format: 'uuid',
    example: 'bb69c42a-6c9d-4af9-9e86-1fea4ca37a27',
  })
  userId: string;
  
  @ApiProperty({
    description: 'Vote type',
    type: 'string',
    enum: VoteTypeEnum,
    example: VoteTypeEnum.EMPTY,
  })
  voteType: VoteTypeEnum;
}