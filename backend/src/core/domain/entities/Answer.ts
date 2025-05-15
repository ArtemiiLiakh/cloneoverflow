import { Model } from '@common/model/Model';
import { Timestamps } from '@common/model/Timestamp';

export class Answer implements Model, Timestamps {
  constructor (
    public id: string,
    public ownerId: string,
    public questionId: string,
    public text: string,
    public rating: number,
    public isSolution: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static new ({
    id,
    ownerId,
    questionId,
    text,
    rating,
    isSolution,
    createdAt,
    updatedAt,
  }: {
    id?: string,
    ownerId: string,
    questionId: string,
    text: string,
    rating?: number,
    isSolution?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
  }) {
    const date = new Date();

    return new Answer(
      id ?? '',
      ownerId,
      questionId,
      text,
      rating ?? 0,
      isSolution ?? false,
      createdAt ?? date,
      updatedAt ?? date,
    );
  }
}
