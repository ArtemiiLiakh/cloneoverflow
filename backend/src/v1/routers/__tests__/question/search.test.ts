import app from "@/v1/app";
import { Answer, Question, User } from "@/v1/tests/utils";
import {
  OrderBy,
  QuestionStatus,
  QuestionUpdateDTO,
  SearchQuestionFilterBy,
  SearchQuestionsDTO,
  SearchQuestionSortBy,
  SearchQuestionsResponse,
  VoteType,
} from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test searching question router', () => {
  it('Search question', async () => {
    const { cookies } = await User.signup();

    await Question.createQuestion(cookies);
    await Question.createQuestion(cookies);
    await Question.createQuestion(cookies);
    await Question.createQuestion(cookies);
    const question = await Question.createQuestion(cookies);

    const searchDTO: SearchQuestionsDTO = {
      sortBy: [SearchQuestionSortBy.DATE],
      orderBy: OrderBy.DESC,
    };

    const res = await supertest(app)
      .get('/api/questions/search')
      .query(searchDTO)
      .expect(200);

    const questions: SearchQuestionsResponse = res.body;

    expect(questions.pagination.totalAmount).toEqual(5);
    expect(questions.questions[0].id).toEqual(question.id);
  });

  it('Search questions using filters', async () => {
    const { cookies } = await User.signup();

    await Question.createQuestion(cookies);
    await Question.createQuestion(cookies);
    const question = await Question.createQuestion(cookies);
    const q1 = await Question.createQuestion(cookies);
    const q2 = await Question.createQuestion(cookies);

    const updateData: QuestionUpdateDTO = {
      status: QuestionStatus.CLOSED,
    };

    await supertest(app)
      .patch(`/api/questions/${q1.id}/update`)
      .set('Cookie', cookies)
      .send(updateData)
      .expect(200);

    await supertest(app)
      .patch(`/api/questions/${q2.id}/update`)
      .set('Cookie', cookies)
      .send(updateData)
      .expect(200);

    const searchDTO: SearchQuestionsDTO = {
      filterBy: [SearchQuestionFilterBy.ACTIVE],
      sortBy: [SearchQuestionSortBy.DATE],
      orderBy: OrderBy.DESC,
    };

    const res = await supertest(app)
      .get('/api/questions/search')
      .query(searchDTO)
      .expect(200);

    const questions: SearchQuestionsResponse = res.body;

    expect(questions.pagination.totalAmount).toEqual(3);
    expect(questions.questions[0].id).toEqual(question.id);
  });

  it('Search questions using multiple sortings', async () => {
    const { cookies } = await User.signup();
    const user2 = await User.signup();

    const q1 = await Question.createQuestion(cookies);
    const q2 = await Question.createQuestion(cookies);
    const q3 = await Question.createQuestion(cookies);
    const q4 = await Question.createQuestion(cookies);
    const q5 = await Question.createQuestion(cookies);

    const searchDTO: SearchQuestionsDTO = {
      sortBy: [SearchQuestionSortBy.RATE, SearchQuestionSortBy.VIEWS, SearchQuestionSortBy.ANSWERS, SearchQuestionSortBy.DATE],
      orderBy: OrderBy.DESC,
    };

    await Question.voteQuestion(user2.cookies, q1.id, VoteType.UP);
    await supertest(app)
      .get(`/api/questions/${q2.id}/get`)
      .set('Cookie', user2.cookies)
      .expect(200);
    await Answer.createAnswer(user2.cookies, {
      questionId: q3.id,
      text: 'answer',
    });

    const res = await supertest(app)
      .get('/api/questions/search')
      .query(searchDTO)
      .expect(200);

    const questions: SearchQuestionsResponse = res.body;

    expect(questions.pagination.totalAmount).toEqual(5);
    expect(questions.questions[0].id).toEqual(q1.id);
    expect(questions.questions[1].id).toEqual(q2.id);
    expect(questions.questions[2].id).toEqual(q3.id);
    expect(questions.questions[3].id).toEqual(q5.id);
    expect(questions.questions[4].id).toEqual(q4.id);
  });

  it('Search questions by search text', async () => {
    const { cookies } = await User.signup({
      email: 'email@gmail.com',
      password: 'password',
      name: 'author',
      username: 'author_username',
    });

    const q1 = await Question.createQuestion(cookies, {
      title: 'question1',
      text: 'text',
      tags: ['other'],
    });
    const q2 = await Question.createQuestion(cookies, {
      title: 'question2',
      text: 'text',
      tags: ['tag1', 'tag2']
    });
    const q3 = await Question.createQuestion(cookies, {
      title:'question3',
      text: 'question text',
      tags: ['other']
    });

    const q1SearchDTO: SearchQuestionsDTO = {
      search: '1',
    };

    const q2SearchDTO: SearchQuestionsDTO = {
      search: '?#tag1#sometag',
    };

    const q3SearchDTO: SearchQuestionsDTO = {
      search: '3?:author',
    };

    const res1 = await supertest(app)
      .get('/api/questions/search')
      .query(q1SearchDTO)
      .expect(200);

    const res2 = await supertest(app)
      .get('/api/questions/search')
      .query(q2SearchDTO)
      .expect(200);
    
    const res3 = await supertest(app)
      .get('/api/questions/search')
      .query(q3SearchDTO)
      .expect(200);

    const questionRes1: SearchQuestionsResponse = res1.body;
    const questionRes2: SearchQuestionsResponse = res2.body;
    const questionRes3: SearchQuestionsResponse = res3.body;

    expect(questionRes1.questions.length).toEqual(1);
    expect(questionRes2.questions.length).toEqual(1);
    expect(questionRes3.questions.length).toEqual(1);
    
    expect(questionRes1.questions[0].id).toEqual(q1.id);
    expect(questionRes2.questions[0].id).toEqual(q2.id);
    expect(questionRes3.questions[0].id).toEqual(q3.id);
  });

  it('Search empty questions', async () => {
    const res = await supertest(app)
      .get('/api/questions/search')
      .expect(200);

    const questions: SearchQuestionsResponse = res.body;

    expect(questions.pagination.totalAmount).toEqual(0);
    expect(questions.questions.length).toEqual(0);
  });
});