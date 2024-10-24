import { UserAnswerStatusEnum } from "@common/enums/UserAnswerStatus";
import { VoteType } from "@cloneoverflow/common";
import { randomUUID } from "crypto";
import { Model } from "@common/model/Model";

export class AnswerUserStats implements Model {
  constructor(
    public id: string,
    public userId: string,
    public answerId: string,
    public status: UserAnswerStatusEnum,
    public voteType: VoteType | null,  
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
      voteType?: VoteType | null,
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