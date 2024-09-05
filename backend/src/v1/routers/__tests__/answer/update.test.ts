import app from "@/v1/app";
import { Answer, Question, User } from "@/v1/tests/utils";
import { AnswerUpdateDTO, AnswerUpdateResponse } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test updating answer rotuer', () => {
  it('Update answer', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);
    const answer = await Answer.createAnswer(cookies, {
      questionId: question.id,
      text: 'answer',
    });

    const data: AnswerUpdateDTO = {
      text: 'new answer text',
    };

    const res = await supertest(app)
      .patch(`/api/answers/${answer.id}/update`)
      .set('Cookie', cookies)
      .send(data)
      .expect(200);
    
    const answerRes: AnswerUpdateResponse = res.body;
    
    expect(answerRes.id).toEqual(answer.id);
    expect(answerRes.text).toEqual(data.text);
  });

  it('Update answer with another user', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();
    const question = await Question.createQuestion(user1.cookies);
    const answer = await Answer.createAnswer(user1.cookies, {
      questionId: question.id,
      text: 'answer',
    });

    const data: AnswerUpdateDTO = {
      text: 'new answer text',
    };

    await supertest(app)
      .patch(`/api/answers/${answer.id}/update`)
      .set('Cookie', user2.cookies)
      .send(data)
      .expect(403);
  });

  it('Update answer with wrong answer id', async () => {
    const { cookies } = await User.signup();
  
    const data: AnswerUpdateDTO = {
      text: 'new answer text',
    };
  
    await supertest(app)
      .patch(`/api/answers/123456/update`)
      .set('Cookie', cookies)
      .send(data)
      .expect(404);
  });

  it('Update answer with unauthorized user', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);
    const answer = await Answer.createAnswer(cookies, {
      questionId: question.id,
      text: 'answer',
    });

    const data: AnswerUpdateDTO = {
      text: 'new answer text',
    };
  
    await supertest(app)
      .patch(`/api/answers/${answer.id}/update`)
      .send(data)
      .expect(401);
  });
});