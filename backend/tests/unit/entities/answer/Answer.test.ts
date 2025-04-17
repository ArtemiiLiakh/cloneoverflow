import { Answer } from '@core/models/answer/Answer';

describe('Entity: test Answer entity', () => {
  test('Create Answer entity with fullfiled fields', () => {
    const payload: Answer = {
      answerId: 'answerId',
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
      rating: 0,
      isSolution: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const answer = Answer.new(payload);

    expect(answer.answerId).toEqual(payload.answerId);
    expect(answer.ownerId).toEqual(payload.ownerId);
    expect(answer.questionId).toEqual(payload.questionId);
    expect(answer.text).toEqual(payload.text);
    expect(answer.rating).toEqual(payload.rating);
    expect(answer.isSolution).toEqual(payload.isSolution);
    expect(answer.createdAt).toBe(payload.createdAt);
    expect(answer.updatedAt).toBe(payload.updatedAt);
  });

  test('Create Answer entity without owner', () => {
    const payload: Answer = {
      answerId: 'answerId',
      ownerId: '',
      questionId: 'questionId',
      text: 'text',
      rating: 0,
      isSolution: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const answer = Answer.new(payload);

    expect(answer).toMatchObject(payload);
  });
});