import { QuestionViewer } from '@core/models/question';

describe('Entity: test QuestionViewer entity', () => {
  test('Create QuestionViewer entity with fullfiled fields', () => {
    const payload: QuestionViewer = {
      id: 'id',
      questionId: 'questionId',
      userId: 'userId',
    };

    const questionViewer = QuestionViewer.new(payload);

    expect(questionViewer).toMatchObject(payload);
  });
});