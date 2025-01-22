import { AnswerUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { Model } from '@common/model/Model';

export class AnswerUser implements Model {
  constructor (
    public id: string,
    public userId: string,
    public answerId: string,
    public status: AnswerUserStatusEnum,
    public voteType: VoteTypeEnum | null,  
  ) {}

  static new ({
    id,
    userId,
    answerId,
    status,
    voteType,
  }: {
    id?: string,
    userId: string,
    answerId: string,
    status: AnswerUserStatusEnum,
    voteType?: VoteTypeEnum | null,
  }) {
    return new AnswerUser(
      id ?? '', 
      userId, 
      answerId, 
      status, 
      voteType ?? null,
    );
  }
}