import { Answer } from '@core/domain/entities/Answer';

describe('Entity: test Answer entity', () => {
  test('Create Answer entity with default fields', () => {
    const now = Date.now();

    const answer = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });

    expect(answer.id).toEqual('');
    expect(answer.ownerId).toEqual('ownerId');
    expect(answer.text).toEqual('text');
    expect(answer.rating).toEqual(0);
    expect(answer.isSolution).toEqual(false);
    expect(answer.createdAt.getTime()).toBeGreaterThanOrEqual(now);
    expect(answer.updatedAt.getTime()).toBeGreaterThanOrEqual(now);
  });

  test('Create Answer entity with custom fields', () => {
    const date = new Date();

    const payload: Answer = {
      id: 'id',
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
      rating: 10,
      isSolution: true,
      createdAt: date,
      updatedAt: date,
    };

    const question = Answer.new(payload);

    expect(question).toEqual(payload);
  });
});