import { User } from '@core/models';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { TagUtils } from '@tests/e2e/utils/TagUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('DELETE /api/questions/:questionId', () => {
  let owner: User;
  let accessToken: string;
  let refreshToken: string;
  let userUtils: UserUtils;
  let questionUtils: QuestionUtils;
  let answerUtils: AnswerUtils;
  let tagUtils: TagUtils;
  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    userUtils = new UserUtils(nest);
    questionUtils = new QuestionUtils(nest);
    answerUtils = new AnswerUtils(nest);
    tagUtils = new TagUtils(nest);
    
    owner = await userUtils.create();

    const tokens = await userUtils.getTokens(owner);
    accessToken = 'accessToken='+tokens.accessToken;
    refreshToken = 'refreshToken='+tokens.refreshToken;
  });
  
  test('Expect it deletes question without answer and tag', async () => {
    const question = await questionUtils.create({ ownerId: owner.id });

    await supertest(app)
      .delete(`/api/questions/${question.id}`)
      .set('Cookie', [accessToken, refreshToken])
      .expect(200);

    expect(await questionUtils.getQuestion(question.id)).toBeNull();
  });

  test('Expect it deletes question with answer and unrefers tag', async () => {
    const question = await questionUtils.create({ ownerId: owner.id });
    const answer = await answerUtils.create({ ownerId: owner.id, questionId: question.id });
    const tag = await tagUtils.create({ questionId: question.id });

    await supertest(app)
      .delete(`/api/questions/${question.id}`)
      .set('Cookie', [accessToken, refreshToken])
      .expect(200);

    expect(await questionUtils.getQuestion(question.id)).toBeNull();
    expect(await answerUtils.getAnswer(answer.id)).toBeNull();
    expect((await tagUtils.getByQuestion(question.id)).length).toEqual(0);

    await tagUtils.delete(tag.name);
  });

  test('When user is not owner of question except it returns error 403', async () => {
    const question = await questionUtils.create({ ownerId: owner.id });
    const wrongUser = await userUtils.create();
    const tokens = await userUtils.getTokens(wrongUser);
    const accessToken = 'accessToken='+tokens.accessToken;
    const refreshToken = 'refreshToken='+tokens.refreshToken;

    await supertest(app)
      .delete(`/api/questions/${question.id}`)
      .set('Cookie', [accessToken, refreshToken])
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

  test('When question does not exist expect it returns error 404', async () => {
    await supertest(app)
      .delete('/api/questions/0')
      .set('Cookie', [accessToken, refreshToken])
      .expect(404);
  });
});