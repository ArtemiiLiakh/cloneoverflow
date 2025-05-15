import { VoteTypeEnum } from '@enums/VoteType';

export interface AnswerGetVoterResponse {
  voter: {
    answerId: string,
    userId: string,
    voteType: VoteTypeEnum | null,
  } | null;
}