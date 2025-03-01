import { VoteDTO, VoteTypeEnum } from '@cloneoverflow/common';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('PATCH /api/questions/:questionId/vote', () => {
  let ownerAccessToken: string;
  let userAccessToken: string;
  let ownerId: string;
  let questionId: string;
  
  let app: App;
  let userUtils: UserUtils;
  let questionUtils: QuestionUtils; 

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    userUtils = new UserUtils(nest);
    questionUtils = new QuestionUtils(nest);

    const owner = await userUtils.create();
    const user = await userUtils.create({ rating: 10000 });

    ownerId = owner.id;
    questionId = (await questionUtils.create({ ownerId })).id;
    
    ownerAccessToken = 'accessToken='+(await userUtils.getTokens(owner)).accessToken;
    userAccessToken = 'accessToken='+(await userUtils.getTokens(user)).accessToken;
  });

  test('Expect it changes rating on vote', async () => {
    const voteData: VoteDTO = {
      vote: VoteTypeEnum.UP,
    };
    
    await supertest(app)
      .post(`/api/questions/${questionId}/vote`)
      .send(voteData)
      .set('Cookie', userAccessToken)
      .expect(201);

    const owner = await userUtils.getUser(ownerId);
    const question = await questionUtils.getQuestion(questionId);
    
    expect(owner?.rating).toEqual(1);
    expect(question?.rating).toEqual(1);
  });

  test('Expect it changes rating when user votes question with different type', async () => {
    const voteData: VoteDTO = {
      vote: VoteTypeEnum.DOWN,
    };
    
    await supertest(app)
      .post(`/api/questions/${questionId}/vote`)
      .send(voteData)
      .set('Cookie', userAccessToken)
      .expect(201);

    const owner = await userUtils.getUser(ownerId);
    const question = await questionUtils.getQuestion(questionId);
    
    expect(owner?.rating).toEqual(0);
    expect(question?.rating).toEqual(0);
  });

  test('When user votes the same type twice expect it returns error 403', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/vote`)
      .send({ vote: VoteTypeEnum.UP })
      .set('Cookie', userAccessToken)
      .expect(201);
    
    await supertest(app)
      .post(`/api/questions/${questionId}/vote`)
      .send({ vote: VoteTypeEnum.UP })
      .set('Cookie', userAccessToken)
      .expect(403);
  });

  test('When owner votes question expect it returns error 403', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/vote`)
      .send({ vote: VoteTypeEnum.UP })
      .set('Cookie', ownerAccessToken)
      .expect(403);
  });

  test('When vote data is empty or invalid expect it returns error 400', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/vote`)
      .send({ vote: 'invalid' })
      .set('Cookie', userAccessToken)
      .expect(400);
    
    await supertest(app)
      .post(`/api/questions/${questionId}/vote`)
      .set('Cookie', userAccessToken)
      .expect(400);
  });

  test('When user is unauthorized or accessToken is wrong expect it returns error 401', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/vote`)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);

    await supertest(app)
      .post(`/api/questions/${questionId}/vote`)
      .expect(401);
  });

  test('When question is not found or id is invalid expect it returns error 404 or 400', async () => {
    await supertest(app)
      .post('/api/questions/0/vote')
      .set('Cookie', userAccessToken)
      .send({ vote: VoteTypeEnum.UP })
      .expect(404);

    await supertest(app)
      .post('/api/questions/wrongId/vote')
      .set('Cookie', userAccessToken)
      .send({ vote: VoteTypeEnum.UP })
      .expect(400);
  });
});