import { UserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionDetails } from '@core/question';

describe('Entity: test QuestionDetails entity', () => {
  test('Create QuestionDetails entity with fullfiled fields', () => {
    const payload: QuestionDetails = {
      questionId: 'questionId',
      ownerId: 'ownerId',
      title: 'title',
      text: 'text',
      rating: 0,
      views: 0,
      isClosed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [{ id: 'id', name: 'tag' }],
      owner: {
        questionId: 'questionId',
        userId: 'userId',
        name: 'name',
        username: 'username',
        rating: 0,
        status: UserStatusEnum.BLOCKED,
      },
      voter: {
        id: 'id',
        questionId: 'questionId',
        userId: 'userId',
        voteType: VoteTypeEnum.UP,
      },
    };

    const question = QuestionDetails.new(payload);

    expect(question).toMatchObject(payload);
  });

  test('Create QuestionDetails entity without tags, owner and voter', () => {
    const payload: QuestionDetails = {
      questionId: 'questionId',
      ownerId: '',
      title: 'title',
      text: 'text',
      rating: 0,
      views: 1,
      isClosed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
      owner: null,
      voter: null,
    };

    const question = QuestionDetails.new(payload);

    expect(question).toMatchObject(payload);
  });
});