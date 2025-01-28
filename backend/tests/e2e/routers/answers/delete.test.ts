import { PrismaAnswerRepositoryDI, PrismaQuestionRepositoryDI, PrismaTransactionDI, PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('DELETE /api/answers/:answerId', () => {
  let answerId1: string;
  let answerId2: string;
  let ownerAccessToken: string;
  let userAccessToken: string;
  const answerUtils = new AnswerUtils(PrismaAnswerRepositoryDI, PrismaTransactionDI);
  
  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);
    const questionUtils = new QuestionUtils(PrismaQuestionRepositoryDI, PrismaTransactionDI);
    
    const owner = await userUtils.create();
    const user = await userUtils.create();
    const question = await questionUtils.create({ ownerId: owner.id });
    const answer1 = await answerUtils.create({ ownerId: owner.id, questionId: question.id });
    const answer2 = await answerUtils.create({ ownerId: owner.id, questionId: question.id });

    ownerAccessToken = 'accessToken=' + (await userUtils.getTokens(owner)).accessToken;
    userAccessToken = 'accessToken=' + (await userUtils.getTokens(user)).accessToken;
    answerId1 = answer1.id;
    answerId2 = answer2.id;
  });

  test('Expect it deletes question', async () => {
    await supertest(app)
      .delete(`/api/answers/${answerId1}`)
      .set('Cookie', ownerAccessToken)
      .expect(200);

    expect(await answerUtils.getAnswer(answerId1)).toBeNull();
  });

  test('When answer is not exists expect it returns error 404', async () => {
    await supertest(app)
      .delete(`/api/answers/${answerId1}`)
      .set('Cookie', ownerAccessToken)
      .expect(404);
  });

  test('When user is not answer owner expect it returns error 403', async () => {
    await supertest(app)
      .delete(`/api/answers/${answerId2}`)
      .set('Cookie', userAccessToken)
      .expect(403);
  });

  test('When user is unauthorized or access token is wrong expect it returns error 401', async () => {
    await supertest(app)
      .delete(`/api/answers/${answerId2}`)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);

    await supertest(app)
      .delete(`/api/answers/${answerId2}`)
      .expect(401);
  });
});