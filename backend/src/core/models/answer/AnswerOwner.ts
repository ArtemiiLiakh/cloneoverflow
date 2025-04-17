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
  
  static new ({
    userId,
    answerId,
    name,
    username,
    rating,
    status,
  }: {
    userId: string,
    answerId: string,
    name: string,
    username: string,
    rating: number,
    status: UserStatusEnum,
  }): AnswerOwner {
    return new AnswerOwner(
      userId,
      answerId,
      name,
      username,
      rating,
      status,
    );
  }
}