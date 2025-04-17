import { PaginationResponse } from '@data/PaginationResponse';
import { VoteTypeEnum } from '@enums/VoteType';

export interface AnswerGetQuestionAnswersResponse {
  answers: {
    id: string,
    questionId: string,
    text: string,
    rating: number,
    isSolution: boolean,
    createdAt: Date,
    updatedAt: Date,
    owner: {
      id: string,
      name: string,
      username: string,
      rating: number,
    } | null,
    myVoteType: VoteTypeEnum | null,
  }[],
  pagination: PaginationResponse;
}