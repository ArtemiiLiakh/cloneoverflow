import { PrismaQuestionRepositoryDI, PrismaTransactionDI, PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { Question } from '@core/domain/entities';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('POST /api/questions/:questionId/viewer', () => {
  let question: Question;
  let accessToken: string;
  const questionUtils = new QuestionUtils(PrismaQuestionRepositoryDI, PrismaTransactionDI);

  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);

    const owner = await userUtils.create();
    accessToken = 'accessToken='+(await userUtils.getTokens(owner)).accessToken;
    question = await questionUtils.create({ ownerId: owner.id });
  });

  test('Expect it creates viewer for question and increases its count', async () => {
    await supertest(app)
      .post(`/api/questions/${question.id}/viewer`)
      .set('Cookie', accessToken)
      .expect(201);

    const updatedQuestion = await questionUtils.getQuestion(question.id);

    expect(question.views).toEqual(0);
    expect(updatedQuestion?.views).toEqual(1);
    
  });

  test('When accessToken is unauthorized or accessToken is wrong expect it returns error 401', async () => {
    await supertest(app)
      .post(`/api/questions/${question.id}/viewer`)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);

    await supertest(app)
      .post(`/api/questions/${question.id}/viewer`)
      .expect(401);
  });

  test('When question is not found or id is wrong expect it returns error 404 or 400', async () => {
    await supertest(app)
      .post('/api/questions/0/viewer')
      .set('Cookie', accessToken)
      .expect(404);

    await supertest(app)
      .post('/api/questions/wrongId/viewer')
      .set('Cookie', accessToken)
      .expect(400);
  });
});