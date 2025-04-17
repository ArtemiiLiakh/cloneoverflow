import { VoteTypeEnum } from '@enums/VoteType'

export interface QuestionGetVoterResponse {
  voterId: string
  questionId: string,
  voteType: VoteTypeEnum,
}