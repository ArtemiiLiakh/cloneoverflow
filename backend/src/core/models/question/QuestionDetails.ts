import { Nullable } from '@common/utils/classTypes';
import { Tag } from '../tag/Tag';
import { QuestionOwner } from './QuestionOwner';
import { QuestionVoter } from './QuestionVoter';

export class QuestionDetails {
  constructor (
    public questionId: string,
    public ownerId: string,
    public title: string,
    public text: string,
    public rating: number,
    public views: number,
    public isClosed: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public owner: Nullable<QuestionOwner>,
    public tags: Tag[],
    public voter: Nullable<QuestionVoter>,
  ) {}

  static new ({
    questionId,
    ownerId,
    title,
    text,
    rating,
    views,
    isClosed,
    createdAt,
    updatedAt,
    owner,
    tags,
    voter,
  }: {
    questionId: string,
    ownerId: string,
    title: string,
    text: string,
    isClosed: boolean,
    rating: number,
    views: number,
    createdAt: Date,
    updatedAt: Date,
    owner: Nullable<QuestionOwner>,
    voter: Nullable<QuestionVoter>,
    tags: Tag[],
  }): QuestionDetails {
    return new QuestionDetails(
      questionId,
      ownerId,
      title,
      text,
      rating,
      views,
      isClosed,
      createdAt,
      updatedAt,
      owner,
      tags,
      voter,
    );
  }
}