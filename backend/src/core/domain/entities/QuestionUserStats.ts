import { VoteType } from "@cloneoverflow/common";
import { UserQuestionStatusEnum } from "@common/enums/UserQuestionStatus";
import { Model } from "@common/model/Model";
import { randomUUID } from "crypto";

export class QuestionUserStats implements Model {
  constructor (
    public id: string,
    public questionId: string,
    public userId: string,
    public status: UserQuestionStatusEnum,
    public voteType: VoteType | null
  ) {}

  static new ({
    id,
    questionId,
    status,
    userId,
    voteType
  }: {
    id?: string,
    questionId: string,
    userId: string,
    status: UserQuestionStatusEnum,
    voteType?: VoteType | null
  }) {
    return new QuestionUserStats(
      id ?? randomUUID(), 
      questionId, 
      userId, 
      status, 
      voteType ?? null
    );
  }
}