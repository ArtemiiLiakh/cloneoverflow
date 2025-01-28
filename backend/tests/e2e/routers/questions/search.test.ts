import { PrismaQuestionRepositoryDI, PrismaTransactionDI, PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { OrderByEnum, SearchQuestionFilterByEnum, SearchQuestionsDTO, SearchQuestionSortByEnum, SearchQuestionsResponse } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('GET /api/questions/search', () => {
  let question1: Question;
  let question2: Question;
  
  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);
    const owner = await userUtils.create();
    const questionUtils = new QuestionUtils(PrismaQuestionRepositoryDI, PrismaTransactionDI);

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
      .get('/api/questions/search')
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
      .get('/api/questions/search')
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
      .get('/api/questions/search')
      .expect(200)
      .query(query)
      .then(res => res.body);

    expect(questions.questions.length).toEqual(0);
  });
});
