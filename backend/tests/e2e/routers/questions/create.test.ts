import { QuestionCreateDTO, QuestionCreateResponse } from '@cloneoverflow/common';
import { User } from '@core/models/user/User';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { TagUtils } from '@tests/e2e/utils/TagUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('POST /api/questions', () => {
  let user: User;
  let accessToken: string;
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
    accessToken = 'accessToken='+(await userUtils.getTokens(user)).accessToken;
  });

  test('Expect it creates question with tags', async () => {
    const createData: QuestionCreateDTO = {
      title: 'title',
      text: 'text',
      tags: [questionTag],
    };

    const question: QuestionCreateResponse = await supertest(app)
      .post('/api/questions')
      .set('Cookie', accessToken)
      .send(createData)
      .expect(201)
      .then(res => res.body);

    expect(question.title).toEqual(createData.title);
    expect(question.text).toEqual(createData.text);

    const tag = await tagUtils.getTag(questionTag);
    expect(tag).not.toBeNull();
    
    await questionUtils.delete(question.id);
  });

  test('When there are no data in body expect it returns error 400', async () => {
    await supertest(app)
      .post('/api/questions')
      .set('Cookie', accessToken)
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