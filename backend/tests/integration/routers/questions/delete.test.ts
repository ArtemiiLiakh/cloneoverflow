import { User } from '@core/user';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { AnswerUtils } from '@tests/integration/utils/AnswerUtils';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { TagUtils } from '@tests/integration/utils/TagUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('DELETE /api/questions/:questionId', () => {
  let owner: User;
  let ownerAuthTokens: string;
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
    ownerAuthTokens = tokens.accessToken + ';' + tokens.refreshToken;
  });
  
  test('Expect it deletes question without answer and tag', async () => {
    const question = await questionUtils.create({ ownerId: owner.userId });

    await supertest(app)
      .delete(`/api/questions/${question.questionId}`)
      .set('Cookie', ownerAuthTokens)
      .expect(204);

    expect(await questionUtils.getQuestion(question.questionId)).toBeNull();
  });

  test('Expect it deletes question with answer and unrefers tag', async () => {
    const question = await questionUtils.create({ 
      ownerId: owner.userId,
    });
    
    const answer = await answerUtils.create({ 
      ownerId: owner.userId, 
      questionId: +question.questionId,
    });

    const tag = await tagUtils.create({ 
      questionId: question.questionId,
    });

    await supertest(app)
      .delete(`/api/questions/${question.questionId}`)
      .set('Cookie', ownerAuthTokens)
      .expect(204);

    expect(await questionUtils.getQuestion(question.questionId)).toBeNull();
    expect(await answerUtils.getAnswer(answer.answerId)).toBeNull();
    expect((await tagUtils.getByQuestion(question.questionId)).length).toEqual(0);
  });

  test('When user is not owner of question except it returns error 403', async () => {
    const question = await questionUtils.create({ ownerId: owner.userId });
    const wrongUser = await userUtils.create();
    const tokens = await userUtils.getTokens(wrongUser);
    const authTokens = tokens.accessToken + ';' + tokens.refreshToken;

    await supertest(app)
      .delete(`/api/questions/${question.questionId}`)
      .set('Cookie', authTokens)
      .expect(403);

    await userUtils.delete(wrongUser.userId);
    await questionUtils.delete(question.questionId);
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
      .set('Cookie', ownerAuthTokens)
      .expect(404);
  });
});