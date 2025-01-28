import { PrismaAnswerRepositoryDI, PrismaQuestionRepositoryDI, PrismaTagRepositoryDI, PrismaTransactionDI, PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { User } from '@core/domain/entities';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { TagUtils } from '@tests/e2e/utils/TagUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('DELETE /api/questions/:questionId', () => {
  let owner: User;
  let accessToken: string;
  const userUtils = new UserUtils(PrismaUserRepositoryDI);
  const questionUtils = new QuestionUtils(PrismaQuestionRepositoryDI, PrismaTransactionDI);
  const answerUtils = new AnswerUtils(PrismaAnswerRepositoryDI, PrismaTransactionDI);
  const tagUtils = new TagUtils(PrismaTagRepositoryDI, PrismaTransactionDI);

  beforeAll(async () => {
    owner = await userUtils.create();
    accessToken = 'accessToken='+(await userUtils.getTokens(owner)).accessToken;
  });
  
  test('Expect it deletes question without answer and tag', async () => {
    const question = await questionUtils.create({ ownerId: owner.id });

    await supertest(app)
      .delete(`/api/questions/${question.id}`)
      .set('Cookie', accessToken)
      .expect(200);

    expect(await questionUtils.getQuestion(question.id)).toBeNull();
  });

  test('Expect it deletes question with answer and unrefers tag', async () => {
    const question = await questionUtils.create({ ownerId: owner.id });
    const answer = await answerUtils.create({ ownerId: owner.id, questionId: question.id });
    const tag = await tagUtils.create({ questionId: question.id });

    await supertest(app)
      .delete(`/api/questions/${question.id}`)
      .set('Cookie', accessToken)
      .expect(200);

    expect(await questionUtils.getQuestion(question.id)).toBeNull();
    expect(await answerUtils.getAnswer(answer.id)).toBeNull();
    expect((await tagUtils.getByQuestion(question.id)).length).toEqual(0);

    await tagUtils.delete(tag.name);
  });

  test('When user is not owner of question except it returns error 403', async () => {
    const question = await questionUtils.create({ ownerId: owner.id });
    const wrongUser = await userUtils.create();
    const wrongAccessToken = (await userUtils.getTokens(wrongUser)).accessToken;

    await supertest(app)
      .delete(`/api/questions/${question.id}`)
      .set('Cookie', `accessToken=${wrongAccessToken}`)
      .expect(403);

    await userUtils.delete(wrongUser.id);
    await questionUtils.delete(question.id);
  });

  test('When user is unauthorized or access token is wrong expect it returns error 401', async () => {
    await supertest(app)
      .delete('/api/questions/0')
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);

    await supertest(app)
      .delete('/api/questions/0')
      .expect(401);
  });

  test('When question is not exists expect it returns error 404', async () => {
    await supertest(app)
      .delete('/api/questions/0')
      .set('Cookie', accessToken)
      .expect(404);
  });
});