import { VoteTypeEnum } from '@cloneoverflow/common';

export class AnswerVoter {
  constructor (
    public id: string,
    public userId: string,
    public answerId: string,
    public voteType: VoteTypeEnum,
  ) {}
  
  static new (properties: {
    id: string,
    userId: string,
    answerId: string,
    voteType: VoteTypeEnum,
  }): AnswerVoter {
    return new AnswerVoter(
      properties.id, 
      properties.userId, 
      properties.answerId,
      properties.voteType,
    );
  }
}