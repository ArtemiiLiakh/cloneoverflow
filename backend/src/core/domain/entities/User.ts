import { UserStatusEnum } from '@cloneoverflow/common';
import { Model } from '@common/model/Model';
import { Timestamps } from '@common/model/Timestamp';
import { randomUUID } from 'crypto';

export class UserCreds implements Model, Timestamps {
  constructor (
    public id: string,
    public email: string,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static new ({
    id,
    email,
    password,
    createdAt,
    updatedAt,
  }: {
    id?: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
  }) {
    
    return new UserCreds(
      id ?? randomUUID(),
      email, 
      password,
      createdAt ?? new Date(),
      updatedAt ?? new Date(),
    );
  }
}

export class User implements Model, Timestamps {
  constructor (
    public id: string,
    public name: string,
    public username: string,
    public reputation: number,
    public status: UserStatusEnum,
    public about: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static new ({
    id,
    name,
    username,
    reputation,
    about,
    status,
    createdAt,
    updatedAt,
  }: {
    id?: string,
    name: string,
    username: string,
    reputation?: number,
    about?: string,
    status?: UserStatusEnum,
    createdAt?: Date,
    updatedAt?: Date,
  }): User {
    id = id ?? randomUUID();
    const date = new Date();

    return new User(
      id,
      name, 
      username, 
      reputation ?? 0, 
      status ?? UserStatusEnum.USER,
      about ?? '', 
      createdAt ?? date,
      updatedAt ?? date,
    );
  }
}