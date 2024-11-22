import { Model } from '@common/model/Model';
import { Timestamps } from '@common/model/Timestamp';
import { randomUUID } from 'crypto';

export class Tag implements Model, Timestamps {
  constructor (
    public id: string,
    public text: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static new ({
    id,
    text,
    createdAt,
    updatedAt,
  }: {
    id?: string,
    text: string,
    createdAt?: Date,
    updatedAt?: Date,
  }) {
    const date = new Date();

    return new Tag(
      id ?? randomUUID(),
      text,
      createdAt ?? date,
      updatedAt ?? date,
    );
  }
}