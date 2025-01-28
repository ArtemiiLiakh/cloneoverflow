import { VoteTypeEnum } from '@enums/VoteType'

export interface QuestionGetVoterResponse {
  voter: {
    voterId: string
    questionId: string,
    voteType: VoteTypeEnum | null,
  } | null,
}