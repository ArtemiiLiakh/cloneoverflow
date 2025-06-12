import { VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionGetVoteParams, QuestionGetVoteResponse } from '@cloneoverflow/common/api/question';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ApiQuestionGetVoteParams implements QuestionGetVoteParams {
  @ApiProperty({
    description: 'Question id',
    type: 'string',
    example: '1',
  })
  @IsNotEmpty({ message: 'Question id is required' })
  @IsNumberString({}, { message: 'Question id must be a number' })
    questionId: string;
}

export class ApiQuestionGetVoteResponse implements QuestionGetVoteResponse {
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