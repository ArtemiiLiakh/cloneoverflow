import { AnswerGetAllResponse, AnswersGetAllDTO, AnswersSortByEnum, OrderByEnum } from '@cloneoverflow/common';
import { Answer } from '@core/models';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { AnswerUtils } from '@tests/e2e/utils/AnswerUtils';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('GET /api/answers', () => {
  let answer1: Answer;
  let answer2: Answer;
  let ownerId: string;
  let questionId: string;

  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);
    const answerUtils = new AnswerUtils(nest); 

    const owner = await userUtils.create();
    const question = await questionUtils.create({ ownerId: owner.id });

    ownerId = owner.id;
    questionId = question.id;
    answer1 = await answerUtils.create({ ownerId, questionId, rating: 1, text: 'Answer 1', isSolution: true });
    answer2 = await answerUtils.create({ ownerId, questionId, rating: 2, text: 'Answer 2', isSolution: false });
  });

  test('Expect it returns list of answers with default options', async () => {
    const answerResult: AnswerGetAllResponse = await supertest(app)
      .get('/api/answers')
      .expect(200)
      .then(res => res.body);
    
    expect(answerResult.answers).toHaveLength(2);
    expect(answerResult.answers[0].id).toEqual(answer2.id);
    expect(answerResult.answers[1].id).toEqual(answer1.id);
  });

  test('Expect it returns list of answers according to options', async () => {
    const options: AnswersGetAllDTO = {
      ownerId,
      questionId,
      sortBy: AnswersSortByEnum.SOLUTION,
      orderBy: OrderByEnum.ASC,
      rateFrom: 1,
      rateTo: 2,
      searchText: 'Answer',
    };
    
    const answerResult: AnswerGetAllResponse = await supertest(app)
      .get('/api/answers')
      .query(options)
      .expect(200)
      .then(res => res.body);
    
    expect(answerResult.answers).toHaveLength(2);
    expect(answerResult.answers[0].id).toEqual(answer2.id);
    expect(answerResult.answers[1].id).toEqual(answer1.id);
  });

  test('Expect it returns empty list of answers', async () => {
    const options: AnswersGetAllDTO = {
      ownerId,
      questionId,
      rateFrom: 3,
      rateTo: 4,
    };
    
    const answerResult: AnswerGetAllResponse = await supertest(app)
      .get('/api/answers')
      .query(options)
      .expect(200)
      .then(res => res.body);
    
    expect(answerResult.answers).toHaveLength(0);
  });
});