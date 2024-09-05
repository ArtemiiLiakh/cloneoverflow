import app from "@/v1/app";
import { Answer, Question, User } from "@/v1/tests/utils";
import { OrderBy, UserGASortBy, UserGetAnswersDTO, UserGetAnswersResponse } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test getting user answers router', () => {
  it('Get user answers', async () => {
    const { cookies, user } = await User.signup();

    const answer1 = await Answer.createAnswer(cookies);
    const answer2 = await Answer.createAnswer(cookies);

    const res = await supertest(app)
      .get(`/api/users/${user.id}/answers`)
      .set('Cookie', cookies);

    const body: UserGetAnswersResponse = res.body;

    expect(body.pagination.totalAmount).toEqual(2);
    expect(body.answers.findIndex(answer => answer.id === answer1.id));
    expect(body.answers.findIndex(answer => answer.id === answer2.id));
  });

  it('Get user answers with sort and pagination', async () => {
    const { user, cookies } = await User.signup();

    await Answer.createAnswer(cookies);
    await Answer.createAnswer(cookies);
    const answer3 = await Answer.createAnswer(cookies);

    const res = await supertest(app)
      .get(`/api/users/${user.id}/answers`)
      .set('Cookie', cookies)
      .query({
        sortBy: UserGASortBy.DATE,
        orderBy: OrderBy.DESC,
        pagination: {
          pageSize: 1,
          page: 0
        },
      } as UserGetAnswersDTO)
      .expect(200);
    
    const body: UserGetAnswersResponse = res.body;
    expect(body.answers[0].id).toEqual(answer3.id);
    expect(body.pagination.totalPages).toEqual(3);
    expect(body.pagination.totalAmount).toEqual(3);
  });

  it('Get user ansewrs with search answer', async () => {
    const { user, cookies } = await User.signup();

    const question1 = await Question.createQuestion(cookies);
    const answer1 = await Answer.createAnswer(cookies, {
      questionId: question1.id,
      text: 'answer1'
    });

    const question2 = await Question.createQuestion(cookies, {
      title: 'question2',
      text: 'question text',
      tags: [],
    });
    const answer2 = await Answer.createAnswer(cookies, {
      questionId: question2.id,
      text: 'answer2'
    });

    const res1 = await supertest(app)
      .get(`/api/users/${user.id}/answers`)
      .set('Cookie', cookies)
      .query({
        searchText: '1',
      } as UserGetAnswersDTO)
      .expect(200);

    const res2 = await supertest(app)
      .get(`/api/users/${user.id}/answers`)
      .set('Cookie', cookies)
      .query({
        searchText: 'question2',
      } as UserGetAnswersDTO)
      .expect(200);
    
    const body1: UserGetAnswersResponse = res1.body;
    const body2: UserGetAnswersResponse = res2.body;
    
    expect(body1.answers[0].id).toEqual(answer1.id);
    expect(body2.answers[0].id).toEqual(answer2.id);
    expect(body1.pagination.totalAmount).toEqual(1);
    expect(body2.pagination.totalAmount).toEqual(1);
  });

  it('Get user questions with wrong user id', async () => {
    const { cookies } = await User.signup();

    await supertest(app)
      .get(`/api/users/1234567/answers`)
      .set('Cookie', cookies)
      .expect(404);
  });

  it('Get user questions with unauthorized user', async () => {
    const { user } = await User.signup();

    await supertest(app)
      .get(`/api/users/${user.id}/answers`)
      .expect(401);
  });
});