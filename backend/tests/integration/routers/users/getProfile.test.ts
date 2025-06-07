import { UserGetProfileResponse } from '@cloneoverflow/common/api/user';
import { User } from '@core/user/User';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { AnswerUtils } from '@tests/integration/utils/AnswerUtils';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import { randomUUID } from 'crypto';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('GET /api/users/:userId/profile', () => {
  let questionUtils: QuestionUtils;
  let answerUtils: AnswerUtils;
  let user: User;
  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();

    user = await new UserUtils(nest).create();
    questionUtils = new QuestionUtils(nest);
    answerUtils = new AnswerUtils(nest);

    app = nest.getHttpServer();
  });

  test('Expect it returns user profile without questions and answers', async () => {
    const profile: UserGetProfileResponse = await supertest(app)
      .get(`/api/users/${user.userId}/profile`)
      .expect(200)
      .then((res) => res.body);

    expect(profile.id).toEqual(user.userId);
    expect(profile.bestQuestion).toBeNull();
    expect(profile.bestAnswer).toBeNull();
  });

  test('Expect it returns user profile with questions and answers', async () => {
    const question = await questionUtils.create({
      ownerId: user.userId,
    });

    const answer = await answerUtils.create({
      ownerId: user.userId,
      questionId: +question.questionId,
    });

    const profile: UserGetProfileResponse = await supertest(app)
      .get(`/api/users/${user.userId}/profile`)
      .expect(200)
      .then((res) => res.body);

    expect(profile.id).toEqual(user.userId);
    expect(profile.bestQuestion?.id).toEqual(question.questionId);
    expect(profile.bestAnswer?.id).toEqual(answer.answerId);

    await questionUtils.delete(question.questionId);
  });

  test('When user does not exist expect it returns error 404', async () => {
    await supertest(app)
      .get(`/api/users/${randomUUID()}/profile`)
      .expect(404);
  });

  test('When user id is wrong expect it returns error 400', async () => {
    await supertest(app)
      .get('/api/users/wrongId/profile')
      .expect(400);
  });
});
