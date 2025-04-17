import { UserStatusEnum } from '@cloneoverflow/common';

export class UserProfile {
  constructor (
    public userId: string,
    public email: string,
    public name: string,
    public username: string,
    public about: string,
    public rating: number,
    public status: UserStatusEnum,
    public createdAt: Date,
    public updatedAt: Date,
    public questionAmount: number,
    public answerAmount: number,
  ) {}

  static new ({
    userId,
    email,
    name,
    username,
    about,
    rating,
    status,
    createdAt,
    updatedAt,
    questionAmount,
    answerAmount,
  }: {
    userId: string,
    email: string,
    name: string,
    username: string,
    about: string,
    rating: number,
    status: UserStatusEnum,
    createdAt: Date,
    updatedAt: Date,
    questionAmount: number,
    answerAmount: number,
  }): UserProfile {
    return new UserProfile(
      userId,
      email,
      name, 
      username,
      about,
      rating,
      status,
      createdAt,
      updatedAt,
      questionAmount,
      answerAmount,
    );
  }
}