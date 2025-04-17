import { VoteTypeEnum } from '@cloneoverflow/common';

export class AnswerVoter {
  constructor (
    public id: string,
    public userId: string,
    public answerId: string,
    public voteType: VoteTypeEnum,
  ) {}
  
  static new ({
    id,
    userId,
    answerId,
    voteType,
  }: {
    id: string,
    userId: string,
    answerId: string,
    voteType: VoteTypeEnum,
  }): AnswerVoter {
    return new AnswerVoter(
      id, 
      userId, 
      answerId,
      voteType,
    );
  }
}