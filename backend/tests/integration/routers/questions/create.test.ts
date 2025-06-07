import { QuestionCreateBody, QuestionCreateResponse } from '@cloneoverflow/common/api/question';
import { User } from '@core/user/User';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { TagUtils } from '@tests/integration/utils/TagUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('POST /api/questions', () => {
  let user: User;
  let ownerAuthTokens: string;
  let questionUtils: QuestionUtils;
  let tagUtils: TagUtils;
  let app: App;

  const questionTag = 'tag';
  
  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    questionUtils = new QuestionUtils(nest);
    tagUtils = new TagUtils(nest);

    user = await userUtils.create();

    const tokens = await userUtils.getTokens(user);
    ownerAuthTokens = tokens.accessToken + ';' + tokens.refreshToken;
  });

  test('Expect it creates question with tags', async () => {
    const createData: QuestionCreateBody = {
      title: 'title',
      text: 'text',
      tags: [questionTag],
    };

    const question: QuestionCreateResponse = await supertest(app)
      .post('/api/questions')
      .set('Cookie', ownerAuthTokens)
      .send(createData)
      .expect(201)
      .then(res => res.body);


    expect(await questionUtils.getQuestion(question.id)).not.toBeNull();

    const tag = await tagUtils.getTag(questionTag);
    expect(tag).not.toBeNull();
  });

  test('When there are no data in body expect it returns error 400', async () => {
    await supertest(app)
      .post('/api/questions')
      .set('Cookie', ownerAuthTokens)
      .expect(400);
  });

  test('When user is not authorized expect it returns error 401', async () => {
    await supertest(app)
      .post('/api/questions')
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);

    await supertest(app)
      .post('/api/questions')
      .expect(401);
  });
});