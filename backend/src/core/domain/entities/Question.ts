import { Model } from '@common/model/Model';
import { Timestamps } from '@common/model/Timestamp';
import { randomUUID } from 'crypto';

export class Question implements Model, Timestamps {
  constructor (
    public id: string,
    public ownerId: string,
    public title: string,
    public text: string,
    public rate: number,
    public views: number,
    public isClosed: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static new ({
    id,
    ownerId,
    title,
    text,
    rate,
    views,
    isClosed,
    createdAt,
    updatedAt,
  }: {
    id?: string,
    ownerId: string,
    title: string,
    text: string,
    isClosed?: boolean,
    rate?: number,
    views?: number,
    createdAt?: Date,
    updatedAt?: Date,
  }) {
    const date = new Date();

    return new Question(
      id ?? randomUUID(),
      ownerId,
      title,
      text,
      rate ?? 0,
      views ?? 0,
      isClosed ?? false,
      createdAt ?? date,
      updatedAt ?? date,
    );
  }
}