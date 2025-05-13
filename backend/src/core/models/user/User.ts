import { UserStatusEnum } from '@cloneoverflow/common';

export class User {
  constructor (
    public userId: string,
    public name: string,
    public username: string,
    public rating: number,
    public status: UserStatusEnum,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static new (properties: {
    userId: string,
    name: string,
    username: string,
    rating: number,
    status: UserStatusEnum,
    createdAt: Date,
    updatedAt: Date,
  }): User {
    return new User(
      properties.userId,
      properties.name, 
      properties.username,
      properties.rating,
      properties.status,
      properties.createdAt,
      properties.updatedAt,
    );
  }
}