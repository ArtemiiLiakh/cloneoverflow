export class Question {
  constructor (
    public questionId: string,
    public ownerId: string,
    public title: string,
    public text: string,
    public rating: number,
    public views: number,
    public isClosed: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static new ({
    questionId,
    ownerId,
    title,
    text,
    rating,
    views,
    isClosed,
    createdAt,
    updatedAt,
  }: {
    questionId: string,
    ownerId: string,
    title: string,
    text: string,
    isClosed: boolean,
    rating: number,
    views: number,
    createdAt: Date,
    updatedAt: Date,
  }): Question {
    return new Question(
      questionId,
      ownerId,
      title,
      text,
      rating,
      views,
      isClosed,
      createdAt,
      updatedAt,
    );
  } 
}