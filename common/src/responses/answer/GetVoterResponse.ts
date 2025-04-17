import { VoteTypeEnum } from '@enums/VoteType';

export interface AnswerGetVoterResponse {
  answerId: string,
  userId: string,
  voteType: VoteTypeEnum,
}