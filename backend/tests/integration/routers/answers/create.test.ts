import { AnswerCreateBody, AnswerCreateResponse, AnswerPaths } from '@cloneoverflow/common/api/answer';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { AnswerUtils } from '@tests/integration/utils/AnswerUtils';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('POST /api/answers', () => {
  let ownerId: string;
  let questionId: string;
  let ownerAuthTokens: string;

  let answerUtils: AnswerUtils;
  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);
    answerUtils = new AnswerUtils(nest);

    const owner = await userUtils.create();
    const question = await questionUtils.create({ ownerId: owner.userId });
    
    ownerId = owner.userId;
    questionId = question.questionId;

    const tokens = await userUtils.getTokens(owner);

    ownerAuthTokens = tokens.accessToken + ';' + tokens.refreshToken;
  });

  test('Expect it creates an answer', async () => {
    const createData: AnswerCreateBody = {
      questionId,
      text: 'answer',
    };

    const answer = await supertest(app)
      .post('/api/answers')
      .set('Cookie', ownerAuthTokens)
      .send(createData)
      .expect(201)
      .then(res => res.body as AnswerCreateResponse);

    expect(await answerUtils.getAnswer(answer.id)).not.toBeNull();
  });

  test('When question does not exists or create data is wrong expect it returns error 404 or 400', async () => {
    await supertest(app)
      .post('/api/answers')
      .set('Cookie', ownerAuthTokens)
      .send({
        questionId: '0',
        text: 'answer',
      } as AnswerCreateBody)
      .expect(404);

    await supertest(app)
      .post('/api/answers')
      .set('Cookie', ownerAuthTokens)
      .send({
        questionId,
      } as AnswerCreateBody)
      .expect(400);

    await supertest(app)
      .post('/api/answers')
      .set('Cookie', ownerAuthTokens)
      .expect(400);
  });

  test('When user is unauthorized or access token is wrong expect it returns error 401', async () => {
    await supertest(app)
      .post('/api/answers')
      .set('Cookie', 'accessToken=invalidToken')
      .send({})
      .expect(401);

    await supertest(app)
      .post('/api/answers')
      .send({})
      .expect(401);
  });
});