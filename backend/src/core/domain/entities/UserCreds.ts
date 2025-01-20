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