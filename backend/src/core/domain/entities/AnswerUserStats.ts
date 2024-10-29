import { randomUUID } from "crypto";
import { Model } from "@common/model/Model";
import { UserAnswerStatusEnum, VoteTypeEnum } from "@cloneoverflow/common";

export class AnswerUserStats implements Model {
  constructor(
    public id: string,
    public userId: string,
    public answerId: string,
    public status: UserAnswerStatusEnum,
    public voteType: VoteTypeEnum | null,  
  ) {}

  static new (
    {
      id,
      userId,
      answerId,
      status,
      voteType,
    }: {
      id?: string,
      userId: string,
      answerId: string,
      status: UserAnswerStatusEnum,
      voteType?: VoteTypeEnum | null,
    }
  ) {
    return new AnswerUserStats(
      id ?? randomUUID(), 
      userId, 
      answerId, 
      status, 
      voteType ?? null
    );
  }
}