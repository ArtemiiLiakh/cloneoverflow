export class Answer {
  constructor (
    public answerId: string,
    public ownerId: string,
    public questionId: string,
    public text: string,
    public rating: number,
    public isSolution: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static new ({
    answerId,
    ownerId,
    questionId,
    text,
    rating,
    isSolution,
    createdAt,
    updatedAt,
  }: {
    answerId: string,
    ownerId: string,
    questionId: string,
    text: string,
    rating: number,
    isSolution: boolean,
    createdAt: Date,
    updatedAt: Date,
  }): Answer {
    return new Answer(
      answerId,
      ownerId,
      questionId,
      text,
      rating,
      isSolution,
      createdAt,
      updatedAt,
    );
  }
}