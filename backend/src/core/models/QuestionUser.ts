import { QuestionUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { Model } from '@common/model/Model';

export class QuestionUser implements Model {
  constructor (
    public id: string,
    public questionId: string,
    public userId: string,
    public status: QuestionUserStatusEnum,
    public voteType: VoteTypeEnum | null,
  ) {}

  static new ({
    id,
    questionId,
    status,
    userId,
    voteType,
  }: {
    id?: string,
    questionId: string,
    userId: string,
    status: QuestionUserStatusEnum,
    voteType?: VoteTypeEnum | null
  }) {
    return new QuestionUser(
      id ?? '', 
      questionId, 
      userId, 
      status, 
      voteType ?? null,
    );
  }
}