import { AnswerGetVoterResponse, VoteDTO, VoteTypeEnum } from '@cloneoverflow/common';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('GET /api/answer/:answerId/vote', () => {
  let voterAccessToken: string;
  let voterId: string;
  let answerId: string;
  
  let app: App;

  const voteAnswer = (
    { vote, accessToken, answerId }: { 
      vote: VoteTypeEnum, 
      answerId: string, 
      accessToken: string, 
    },
  ) => {
    return supertest(app)
      .post(`/api/answers/${answerId}/vote`)
      .set('Cookie', accessToken)
      .send({ vote } as VoteDTO)
      .expect(200);
  };
  
  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);
    const answerUtils = new AnswerUtils(nest);

    const owner = await userUtils.create();
    const voter = await userUtils.create({ rating: 10000 });
    const question = await questionUtils.create({ ownerId: owner.id });
    
    voterId = voter.id;
    answerId = (await answerUtils.create({ ownerId: owner.id, questionId: question.id })).id;
    voterAccessToken = 'accessToken='+(await userUtils.getTokens(voter)).accessToken;
  });

  test('Expect it returns voter or null', async () => {
    const res1 = await supertest(app)
      .get(`/api/answers/${answerId}/vote`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(res1.voter).toBeNull();

    await voteAnswer({
      answerId,
      vote: VoteTypeEnum.UP,
      accessToken: voterAccessToken,
    });
  
    const res2: AnswerGetVoterResponse = await supertest(app)
      .get(`/api/answers/${answerId}/vote`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(res2.voter?.userId).toEqual(voterId);
    expect(res2.voter?.answerId).toEqual(answerId);
    expect(res2.voter?.voteType).toEqual(VoteTypeEnum.UP);

    await voteAnswer({
      answerId,
      vote: VoteTypeEnum.DOWN,
      accessToken: voterAccessToken,
    });

    const res3: AnswerGetVoterResponse = await supertest(app)
      .get(`/api/answers/${answerId}/vote`)
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);
    
    expect(res3.voter?.userId).toEqual(voterId);
    expect(res3.voter?.answerId).toEqual(answerId);
    expect(res3.voter?.voteType).toBeNull();
  });

  test('When user is unauthenticated or access token is wrong expect it returns error 401', async () => {
    await supertest(app)
      .get(`/api/answers/${answerId}/vote`)
      .expect(401);

    await supertest(app)
      .get(`/api/answers/${answerId}/vote`)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);
  });

  test('When answer is not found or id is wrong expect it returns error 400 or empty result', async () => {
    const voter = await supertest(app)
      .get('/api/answers/0/vote')
      .set('Cookie', voterAccessToken)
      .expect(200)
      .then(res => res.body);

    expect(voter.voter).toBeNull();
      
    await supertest(app)
      .get('/api/answers/invalidAnswerId/vote')
      .set('Cookie', voterAccessToken)
      .expect(400);
  });
});