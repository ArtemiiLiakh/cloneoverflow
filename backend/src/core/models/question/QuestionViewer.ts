export class QuestionViewer {
  constructor (
    public id: string,
    public userId: string,
    public questionId: string,
  ) {}
  
  static new ({
    id,
    userId,
    questionId,
  }: {
    id: string,
    userId: string,
    questionId: string,
  }): QuestionViewer {
    return new QuestionViewer(id, userId, questionId);
  }
}