import app from "@/app";
import { Answer, Question, User } from "@/tests/utils";
import { QuestionCloseDTO } from "@cloneoverflow/common";
import { QuestionStatus } from "@prisma/client";
import supertest from "supertest";

describe('Test deleting answer router', () => {
  it('Delete answer', async () => {
    const { cookies } = await User.signup();
    const answer = await Answer.createAnswer(cookies);

    await supertest(app)
      .delete(`/api/answers/${answer.id}/delete`)
      .set('Cookie', cookies)
      .expect(200);

    await supertest(app)
      .get(`/api/answers/${answer.id}/get`)
      .expect(404);
  });

  it('Delete solution answer', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);
    const answer = await Answer.createAnswer(cookies, {
      questionId: question.id,
      text: 'answer',
    });

    await supertest(app)
      .patch(`/api/questions/${question.id}/close`)
      .set('Cookie', cookies)
      .send({
        answerId: answer.id,
      } as QuestionCloseDTO)
      .expect(200);
    
    const questionClosed = await Question.getQuestion(question.id);
    expect(questionClosed.status).toEqual(QuestionStatus.CLOSED);
    expect(questionClosed.answers[0].id).toEqual(answer.id);
    expect(questionClosed.answers[0].isSolution).toBeTruthy();

    await supertest(app)
      .delete(`/api/answers/${answer.id}/delete`)
      .set('Cookie', cookies)
      .expect(200);

    const questionActive = await Question.getQuestion(question.id);
    expect(questionActive.status).toEqual(QuestionStatus.ACTIVE);
    expect(questionActive.answers.length).toEqual(0);
  });

  it('Delete answer by another user', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();
    
    const question = await Question.createQuestion(user1.cookies);
    const answer = await Answer.createAnswer(user1.cookies, {
      questionId: question.id,
      text: 'answer',
    });

    await supertest(app)
      .delete(`/api/answers/${answer.id}/delete`)
      .set('Cookie', user2.cookies)
      .expect(403);
  });

  it('Delete answer with wrong id', async () => {
    const { cookies } = await User.signup();

    await supertest(app)
      .delete(`/api/answers/123456/delete`)
      .set('Cookie', cookies)
      .expect(404);
  });

  it('Delete answer with unauthorized user', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);
    const answer = await Answer.createAnswer(cookies, {
      questionId: question.id,
      text: 'answer',
    }); 

    await supertest(app)
      .delete(`/api/answers/${answer.id}/delete`)
      .expect(401);
  });
});