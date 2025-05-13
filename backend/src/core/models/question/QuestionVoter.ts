import { VoteTypeEnum } from '@cloneoverflow/common';

export class QuestionVoter {
  constructor (
    public id: string,
    public userId: string,
    public questionId: string,
    public voteType: VoteTypeEnum,
  ) {}
  
  static new (properties: {
    id: string,
    userId: string,
    questionId: string,
    voteType: VoteTypeEnum,
  }): QuestionVoter {
    return new QuestionVoter(
      properties.id, 
      properties.userId, 
      properties.questionId, 
      properties.voteType,
    );
  }
}