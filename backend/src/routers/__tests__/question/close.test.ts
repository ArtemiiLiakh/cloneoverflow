import app from "@/app";
import { Answer, Question, User } from "@/tests/utils";
import { QuestionCloseDTO } from "@cloneoverflow/common";
import { QuestionStatus } from "@prisma/client";
import supertest from "supertest";

describe('Test closing question router', () => {
  it('Close question', async () => {
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

    const questionRes = await Question.getQuestion(question.id);
    expect(questionRes.id).toEqual(question.id);
    expect(questionRes.status).toEqual(QuestionStatus.CLOSED);
    expect(questionRes.answers[0].id).toEqual(answer.id);
    expect(questionRes.answers[0].isSolution).toBeTruthy();
  });

  it('Close already closed question with another answer', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();
    const question = await Question.createQuestion(user1.cookies);
    const answer1 = await Answer.createAnswer(user1.cookies, {
      questionId: question.id,
      text: 'answer',
    });

    await supertest(app)
      .patch(`/api/questions/${question.id}/close`)
      .set('Cookie', user1.cookies)
      .send({
        answerId: answer1.id,
      } as QuestionCloseDTO)
      .expect(200);

    const questionRes1 = await Question.getQuestion(question.id);
    expect(questionRes1.id).toEqual(question.id);
    expect(questionRes1.status).toEqual(QuestionStatus.CLOSED);
    expect(questionRes1.answers[0].id).toEqual(answer1.id);
    expect(questionRes1.answers[0].isSolution).toBeTruthy();

    const answer2 = await Answer.createAnswer(user2.cookies, {
      questionId: question.id,
      text: 'answer',
    });

    await supertest(app)
      .patch(`/api/questions/${question.id}/close`)
      .set('Cookie', user1.cookies)
      .send({
        answerId: answer2.id,
      } as QuestionCloseDTO)
      .expect(200);

    const questionRes2 = await Question.getQuestion(question.id);
    expect(questionRes2.id).toEqual(question.id);
    expect(questionRes2.status).toEqual(QuestionStatus.CLOSED);
    expect(questionRes2.answers.find(answer => answer.id === answer1.id)?.isSolution).toBeFalsy();
    expect(questionRes2.answers.find(answer => answer.id === answer2.id)?.isSolution).toBeTruthy();
  });

  it('Close already closed question with same answer', async () => {
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

    const questionRes1 = await Question.getQuestion(question.id);
    expect(questionRes1.id).toEqual(question.id);
    expect(questionRes1.status).toEqual(QuestionStatus.CLOSED);
    expect(questionRes1.answers[0].id).toEqual(answer.id);
    expect(questionRes1.answers[0].isSolution).toBeTruthy();

    await supertest(app)
      .patch(`/api/questions/${question.id}/close`)
      .set('Cookie', cookies)
      .send({
        answerId: answer.id,
      } as QuestionCloseDTO)
      .expect(200);

    const questionRes2 = await Question.getQuestion(question.id);
    expect(questionRes2.id).toEqual(question.id);
    expect(questionRes2.status).toEqual(QuestionStatus.ACTIVE);
    expect(questionRes2.answers[0].isSolution).toBeFalsy();
  });

  it('Close question with another user', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();
    const question = await Question.createQuestion(user1.cookies);
    const answer = await Answer.createAnswer(user1.cookies, {
      questionId: question.id,
      text: 'answer',
    });

    await supertest(app)
      .patch(`/api/questions/${question.id}/close`)
      .set('Cookie', user2.cookies)
      .send({
        answerId: answer.id,
      } as QuestionCloseDTO)
      .expect(403);
  });

  it('Close question with wrong question id', async () => {
    const {  cookies } = await User.signup();
    const answer = await Answer.createAnswer(cookies);

    await supertest(app)
      .patch(`/api/questions/12345/close`)
      .set('Cookie', cookies)
      .send({
        answerId: answer.id,
      } as QuestionCloseDTO)
      .expect(404);
  });

  it('Close question with unauthorized user', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);
    const answer = await Answer.createAnswer(cookies, {
      questionId: question.id,
      text: 'answer',
    });

    await supertest(app)
      .patch(`/api/questions/${question.id}/close`)
      .send({
        answerId: answer.id,
      } as QuestionCloseDTO)
      .expect(401);
  });
});