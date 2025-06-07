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

  static new (properties: {
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
      properties.answerId,
      properties.ownerId,
      properties.questionId,
      properties.text,
      properties.rating,
      properties.isSolution,
      properties.createdAt,
      properties.updatedAt,
    );
  }
}