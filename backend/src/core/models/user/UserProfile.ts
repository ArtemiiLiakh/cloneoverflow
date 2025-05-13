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

  static new (properties: {
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
      properties.userId,
      properties.email,
      properties.name, 
      properties.username,
      properties.about,
      properties.rating,
      properties.status,
      properties.createdAt,
      properties.updatedAt,
      properties.questionAmount,
      properties.answerAmount,
    );
  }
}