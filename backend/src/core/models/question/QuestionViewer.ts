export class QuestionViewer {
  constructor (
    public id: string,
    public userId: string,
    public questionId: string,
  ) {}
  
  static new (properties: {
    id: string,
    userId: string,
    questionId: string,
  }): QuestionViewer {
    return new QuestionViewer(
      properties.id, 
      properties.userId, 
      properties.questionId,
    );
  }
}