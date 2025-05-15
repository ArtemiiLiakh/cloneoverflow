import { PrismaAnswerRepositoryDI, PrismaQuestionRepositoryDI, PrismaTransactionDI, PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { UserGetProfileResponse } from '@cloneoverflow/common';
import { User } from '@core/domain/entities/User';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import { randomUUID } from 'crypto';
import supertest from 'supertest';

describe('GET /api/users/:userId/profile', () => {
  const userUtils = new UserUtils(PrismaUserRepositoryDI);
  const questionUtils = new QuestionUtils(PrismaQuestionRepositoryDI, PrismaTransactionDI);
  const answerUtils = new AnswerUtils(PrismaAnswerRepositoryDI, PrismaTransactionDI);
  let user: User;
  
  beforeAll(async () => {
    user = await userUtils.create();
  });

  test('Expect it returns user profile without questions and answers', async () => {
    const profile: UserGetProfileResponse = await supertest(app)
      .get(`/api/users/${user.id}/profile`)
      .expect(200)
      .then((res) => res.body);

    expect(profile.id).toEqual(user.id);
    expect(profile.bestQuestion).toBeNull();
    expect(profile.bestAnswer).toBeNull();
  });

  test('Expect it returns user profile with questions and answers', async () => {
    const question = await questionUtils.create({
      ownerId: user.id,
    });

    const answer = await answerUtils.create({
      questionId: question.id,
      ownerId: user.id,
    });

    const profile: UserGetProfileResponse = await supertest(app)
      .get(`/api/users/${user.id}/profile`)
      .expect(200)
      .then((res) => res.body);

    expect(profile.id).toEqual(user.id);
    expect(profile.bestQuestion?.id).toEqual(question.id);
    expect(profile.bestAnswer?.id).toEqual(answer.id);

    await questionUtils.delete(question.id);
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
