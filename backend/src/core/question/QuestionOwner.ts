import { UserStatusEnum } from '@cloneoverflow/common';

export class QuestionOwner {
  constructor (
    public userId: string,
    public questionId: string,
    public name: string,
    public username: string,
    public rating: number,
    public status: UserStatusEnum,
  ) {}
  
  static new (properties: {
    userId: string,
    questionId: string,
    name: string,
    username: string,
    rating: number,
    status: UserStatusEnum,
  }): QuestionOwner {
    return new QuestionOwner(
      properties.userId,
      properties.questionId,
      properties.name,
      properties.username,
      properties.rating,
      properties.status,
    );
  }
}