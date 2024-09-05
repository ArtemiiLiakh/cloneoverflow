import app from "@/v1/app";
import { Question, User } from "@/v1/tests/utils";
import { AnswerCreateDTO, AnswerCreateResponse } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test creating answer router', () => {
  it('Create answer', async () => {
    const { cookies, user } = await User.signup();
    const question = await Question.createQuestion(cookies);
    
    const data: AnswerCreateDTO = {
      questionId: question.id,
      text: 'answer',
    };

    const res = await supertest(app)
      .post('/api/answers/create')
      .set('Cookie', cookies)
      .send(data)
      .expect(201);

    const answer: AnswerCreateResponse = res.body;
    expect(answer.text).toEqual('answer');
    expect(answer.questionId).toEqual(question.id)
    expect(answer.userId).toEqual(user.id);
    expect(answer.isSolution).toBeFalsy();
  });

  it('Create two answers with the same user', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);
    
    const data: AnswerCreateDTO = {
      questionId: question.id,
      text: 'answer',
    };

    await supertest(app)
      .post('/api/answers/create')
      .set('Cookie', cookies)
      .send(data)
      .expect(201);
    
    await supertest(app)
      .post('/api/answers/create')
      .set('Cookie', cookies)
      .send(data)
      .expect(403);
  });

  it('Create answer with wrong question id', async () => {
    const { cookies } = await User.signup();
    
    const data: AnswerCreateDTO = {
      questionId: '12345',
      text: 'answer',
    };

    await supertest(app)
      .post('/api/answers/create')
      .set('Cookie', cookies)
      .send(data)
      .expect(400);
  });

  it('Create answer with unauthorized user', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);
    
    const data: AnswerCreateDTO = {
      questionId: question.id,
      text: 'answer',
    };

    await supertest(app)
      .post('/api/answers/create')
      .send(data)
      .expect(401);
  });
});