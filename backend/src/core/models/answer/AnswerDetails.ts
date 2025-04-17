import { Nullable } from '@common/utils/classTypes';
import { AnswerOwner } from './AnswerOwner';
import { AnswerVoter } from './AnswerVoter';

export class AnswerDetails {
  constructor (
    public answerId: string,
    public ownerId: string,
    public questionId: string,
    public text: string,
    public rating: number,
    public isSolution: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public owner: Nullable<AnswerOwner>,
    public voter: Nullable<AnswerVoter>,
  ) {}

  static new ({
    answerId,
    ownerId,
    questionId,
    text,
    rating,
    isSolution,
    createdAt,
    updatedAt,
    owner,
    voter,
  }: {
    answerId: string,
    ownerId: string,
    questionId: string,
    text: string,
    rating: number,
    isSolution: boolean,
    createdAt: Date,
    updatedAt: Date,
    owner: Nullable<AnswerOwner>,
    voter: Nullable<AnswerVoter>,
  }): AnswerDetails {
    return new AnswerDetails(
      answerId,
      ownerId,
      questionId,
      text,
      rating,
      isSolution,
      createdAt,
      updatedAt,
      owner,
      voter,
    );
  }
}
