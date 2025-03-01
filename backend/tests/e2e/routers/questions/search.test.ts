import { OrderByEnum, SearchQuestionFilterByEnum, SearchQuestionsDTO, SearchQuestionSortByEnum, SearchQuestionsResponse } from '@cloneoverflow/common';
import { Question } from '@core/models';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('GET /api/questions/search', () => {
  let question1: Question;
  let question2: Question;
  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);

    const owner = await userUtils.create();
    
    question1 = await questionUtils.create({ 
      ownerId: owner.id, 
      title: 'question 1', 
      rating: 9, 
      createdAt: new Date(1), 
      views: 1,
    });
    
    question2 = await questionUtils.create({ 
      ownerId: owner.id, 
      title: 'question 2', 
      rating: 10, 
      createdAt: new Date(2), 
      views: 1,
    });
  });

  test('Expect it search questions with default options', async () => {
    const res: SearchQuestionsResponse = await supertest(app)
      .get('/api/questions')
      .expect(200)
      .then(res => res.body);

    expect(res.questions.at(0)?.id).toEqual(question2.id);
    expect(res.questions.at(1)?.id).toEqual(question1.id);
  });

  test('Expect it search question with certain options', async () => {
    const query: SearchQuestionsDTO = {
      filterBy: [SearchQuestionFilterByEnum.ACTIVE],
      search: 'question',
      orderBy: OrderByEnum.ASC,
      sortBy: [SearchQuestionSortByEnum.VIEWS, SearchQuestionSortByEnum.RATE],  
    };

    const questions: SearchQuestionsResponse = await supertest(app)
      .get('/api/questions')
      .expect(200)
      .query(query)
      .then(res => res.body);

    expect(questions.questions.at(0)?.id).toEqual(question1.id);
    expect(questions.questions.at(1)?.id).toEqual(question2.id);
  });

  test('Expect it returns empty list if questions were not found', async () => {
    const query: SearchQuestionsDTO = {
      filterBy: [SearchQuestionFilterByEnum.CLOSED],
    };

    const questions: SearchQuestionsResponse = await supertest(app)
      .get('/api/questions')
      .expect(200)
      .query(query)
      .then(res => res.body);

    expect(questions.questions.length).toEqual(0);
  });
});
