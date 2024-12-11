import { Model } from '@common/model/Model';
import { randomUUID } from 'crypto';

export class Tag implements Model {
  constructor (
    public id: string,
    public name: string,
  ) {}

  static new ({
    id,
    name,
  }: {
    id?: string,
    name: string,
  }) {
    return new Tag(
      id ?? randomUUID(),
      name,
    );
  }
}