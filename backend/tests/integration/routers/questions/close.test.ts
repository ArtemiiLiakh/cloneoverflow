import { QuestionCloseBody } from '@cloneoverflow/common/api/question';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { AnswerUtils } from '@tests/integration/utils/AnswerUtils';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('POST /api/questions/:questionId/close', () => {
  let ownerAuthTokens: string;
  let questionId: string;
  let answer1Id: string;
  let answer2Id: string;
  let questionUtils: QuestionUtils;
  let answerUtils: AnswerUtils;
  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    questionUtils = new QuestionUtils(nest);
    answerUtils = new AnswerUtils(nest); 

    const owner = await userUtils.create();
    
    const tokens = await userUtils.getTokens(owner);
    ownerAuthTokens = tokens.accessToken + ';' + tokens.refreshToken;
    
    questionId = (await questionUtils.create({ 
      ownerId: owner.userId,
    })).questionId;

    answer1Id = (await answerUtils.create({ 
      ownerId: owner.userId, 
      questionId: +questionId,
    })).answerId;

    answer2Id = (await answerUtils.create({ 
      ownerId: owner.userId, 
      questionId: +questionId,
    })).answerId;
  });

  test('Expect it opens and closes question', async () => {
    const closeData: QuestionCloseBody = {
      answerId: answer1Id,
    };

    await supertest(app)
      .post(`/api/questions/${questionId}/close`)
      .set('Cookie', ownerAuthTokens)
      .send(closeData)
      .expect(204);

    const question = await questionUtils.getQuestion(questionId);
    const answer = await answerUtils.getAnswer(answer1Id);
  
    expect(question?.isClosed).toBeTruthy();
    expect(answer?.isSolution).toBeTruthy();
  });

  test('Close question with another answer', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/close`)
      .set('Cookie', ownerAuthTokens)
      .send({ answerId: answer2Id })
      .expect(204);

    const answer1 = await answerUtils.getAnswer(answer1Id);
    const answer2 = await answerUtils.getAnswer(answer2Id);

    expect(answer1?.isSolution).toBeFalsy();
    expect(answer2?.isSolution).toBeTruthy();
  });

  test('When question is not found or id is wrong expect it returns error 404 or 400', async () => {
    await supertest(app)
      .post('/api/questions/0/close')
      .set('Cookie', ownerAuthTokens)
      .send({ answerId: answer1Id })
      .expect(404);

    await supertest(app)
      .post('/api/questions/questionId/close')
      .set('Cookie', ownerAuthTokens)
      .send({ answerId: answer1Id })
      .expect(400);
  });

  test('When user is unauthorized or accessToken is wrong expect it returns error 401', async () => {
    await supertest(app)
      .post('/api/questions/0/close')
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);

    await supertest(app)
      .post('/api/questions/questionId/close')
      .expect(401);
  });
});