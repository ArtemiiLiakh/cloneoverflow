import { OrderByEnum, SearchQuestionFilterByEnum, SearchQuestionsDTO, SearchQuestionSortByEnum, SearchQuestionsResponse } from '@cloneoverflow/common';
import { Question } from '@core/models/question';
import { Tag } from '@core/models/tag';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { TagUtils } from '@tests/e2e/utils/TagUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('GET /api/questions/search', () => {
  let question1: Question;
  let question2: Question;
  let question2Tag: Tag;
  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);
    const tagUtils = new TagUtils(nest);

    const owner = await userUtils.create();
    
    question1 = await questionUtils.create({ 
      ownerId: owner.userId, 
      title: 'question 1', 
      rating: 9, 
      createdAt: new Date(1), 
      views: 1,
    });
    
    question2 = await questionUtils.create({ 
      ownerId: owner.userId, 
      title: 'question 2', 
      rating: 10, 
      createdAt: new Date(2), 
      views: 2,
    });
    
    question2Tag = await tagUtils.create({
      questionId: question2.questionId,
    });
  });

  test('Expect it search questions with default options', async () => {
    const res: SearchQuestionsResponse = await supertest(app)
      .get('/api/questions/search')
      .expect(200)
      .then(res => res.body);

    expect(res.questions.at(0)?.id).toEqual(question2.questionId);
    expect(res.questions.at(1)?.id).toEqual(question1.questionId);
  });

  test('Expect it search question with certain options', async () => {
    const query: SearchQuestionsDTO = {
      filterBy: SearchQuestionFilterByEnum.ACTIVE,
      search: 'question',
      orderBy: OrderByEnum.ASC,
      sortBy: SearchQuestionSortByEnum.VIEWS,  
    };

    const { questions }: SearchQuestionsResponse = await supertest(app)
      .get('/api/questions/search')
      .expect(200)
      .query(query)
      .then(res => res.body);

    expect(questions.at(0)?.id).toEqual(question1.questionId);
    expect(questions.at(1)?.id).toEqual(question2.questionId);
  });

  test('Expect it search questions with search filter options', async () => {
    const query: SearchQuestionsDTO = {
      search: `?"question"#${question2Tag.name}`,
    };

    const { questions }: SearchQuestionsResponse = await supertest(app)
      .get('/api/questions/search')
      .expect(200)
      .query(query)
      .then(res => res.body);

    expect(questions.length).toEqual(1);
    expect(questions.at(0)?.id).toEqual(question2.questionId);
  });

  test('Expect it returns empty list if questions were not found', async () => {
    const query: SearchQuestionsDTO = {
      filterBy: SearchQuestionFilterByEnum.CLOSED,
    };

    const questions: SearchQuestionsResponse = await supertest(app)
      .get('/api/questions/search')
      .expect(200)
      .query(query)
      .then(res => res.body);

    expect(questions.questions.length).toEqual(0);
  });
});
