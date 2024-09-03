import app from "@/app";
import { Question, User } from "@/tests/utils";
import { OrderBy, UserGetQuestionResponse, UserGetQuestionsDTO, UserGQSortBy } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test getting user questions router', () => {
  it('Get user questions', async () => {
    const { user, cookies } = await User.signup();

    const question1 = await Question.createQuestion(cookies);
    const question2 = await Question.createQuestion(cookies);
    const question3 = await Question.createQuestion(cookies);

    const res = await supertest(app)
      .get(`/api/users/${user.id}/questions`)
      .set('Cookie', cookies)
      .expect(200);

    const body: UserGetQuestionResponse = res.body;

    expect(body.pagination.totalAmount).toEqual(3);
    expect(body.questions.findIndex(question => question.id === question1.id)).not.toEqual(-1);
    expect(body.questions.findIndex(question => question.id === question2.id)).not.toEqual(-1);
    expect(body.questions.findIndex(question => question.id === question3.id)).not.toEqual(-1);
  });

  it('Get user questions with sort and pagination', async () => {
    const { user, cookies } = await User.signup();

    await Question.createQuestion(cookies);
    await Question.createQuestion(cookies);
    const question3 = await Question.createQuestion(cookies);

    const res = await supertest(app)
      .get(`/api/users/${user.id}/questions`)
      .set('Cookie', cookies)
      .query({
        sortBy: UserGQSortBy.DATE,
        orderBy: OrderBy.DESC,
        pagination: {
          pageSize: 1,
          page: 0
        },
      } as UserGetQuestionsDTO)
      .expect(200);
    
    const body: UserGetQuestionResponse = res.body;
    expect(body.questions[0].id).toEqual(question3.id);
    expect(body.pagination.totalPages).toEqual(3);
    expect(body.pagination.totalAmount).toEqual(3);
  });

  it('Get user questions with search question', async () => {
    const { user, cookies } = await User.signup();

    const question1 = await Question.createQuestion(cookies, {
      title: 'question1',
      text: 'question text',
      tags: [],
    });
    await Question.createQuestion(cookies, {
      title: 'question2',
      text: 'question text',
      tags: [],
    });

    const res = await supertest(app)
      .get(`/api/users/${user.id}/questions`)
      .set('Cookie', cookies)
      .query({
        search: '1',
      } as UserGetQuestionsDTO)
      .expect(200);
    
    const body: UserGetQuestionResponse = res.body;
    expect(body.questions[0].id).toEqual(question1.id);
    expect(body.questions[0].title).toEqual(question1.title);
    expect(body.pagination.totalAmount).toEqual(1);
  });

  it('Get user questions with wrong user id', async () => {
    const { cookies } = await User.signup();

    await supertest(app)
      .get(`/api/users/1234567/questions`)
      .set('Cookie', cookies)
      .expect(404);
  });

  it('Get user questions with unauthorized user', async () => {
    const { user } = await User.signup();

    await supertest(app)
      .get(`/api/users/${user.id}/questions`)
      .expect(401);
  });
});