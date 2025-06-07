import { VoteTypeEnum } from '@enums/VoteType';
import { ApiProperty } from '@nestjs/swagger';
import { questionPath } from './paths';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export const QuestionGetVotePath = questionPath+'/:questionId/vote';

export class QuestionGetVoteParams {
  @ApiProperty({
    description: 'Question id',
    type: 'string',
    example: '1'
  })
  @IsNotEmpty({ message: 'Question id is required' })
  @IsNumberString({}, { message: 'Question id must be a number' })
  questionId: string
}

export class QuestionGetVoteResponse {
  @ApiProperty({
    description: 'Question voter id',
    type: 'string',
    example: '16109179-0736-4757-8336-cdd19b785273',
  })
  voterId: string;
  
  @ApiProperty({
    description: 'Question vote type',
    type: 'string',
    enum: VoteTypeEnum,
    example: VoteTypeEnum.EMPTY,
  })
  voteType: VoteTypeEnum;
}