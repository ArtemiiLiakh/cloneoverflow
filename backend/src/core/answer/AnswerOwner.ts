import { UserStatusEnum } from '@cloneoverflow/common';

export class AnswerOwner {
  constructor (
    public userId: string,
    public answerId: string,
    public name: string,
    public username: string,
    public rating: number,
    public status: UserStatusEnum,
  ) {}
  
  static new (properties: {
    userId: string,
    answerId: string,
    name: string,
    username: string,
    rating: number,
    status: UserStatusEnum,
  }): AnswerOwner {
    return new AnswerOwner(
      properties.userId,
      properties.answerId,
      properties.name,
      properties.username,
      properties.rating,
      properties.status,
    );
  }
}