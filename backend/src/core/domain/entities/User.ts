import { UserStatusEnum } from '@cloneoverflow/common';
import { Model } from '@common/model/Model';
import { Timestamps } from '@common/model/Timestamp';
import { randomUUID } from 'crypto';

export class User implements Model, Timestamps {
  constructor (
    public id: string,
    public name: string,
    public username: string,
    public rating: number,
    public status: UserStatusEnum,
    public about: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static new ({
    id,
    name,
    username,
    rating,
    about,
    status,
    createdAt,
    updatedAt,
  }: {
    id?: string,
    name: string,
    username: string,
    rating?: number,
    about?: string,
    status?: UserStatusEnum,
    createdAt?: Date,
    updatedAt?: Date,
  }): User {
    const date = new Date();

    return new User(
      id ?? randomUUID(),
      name, 
      username,
      rating ?? 0,
      status ?? UserStatusEnum.USER,
      about ?? '', 
      createdAt ?? date,
      updatedAt ?? date,
    );
  }
}