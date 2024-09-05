import app from "@/v1/app";
import { Answer, Question, User } from "@/v1/tests/utils";
import { AnswerGetResponse } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test getting answer router', () => {
  it('Get answer', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);
    const answer = await Answer.createAnswer(cookies, {
      questionId: question.id,
      text: 'answer',
    });

    const res = await supertest(app)
      .get(`/api/answers/${answer.id}/get`)
      .expect(200);
    
    const answerRes: AnswerGetResponse = res.body;

    expect(answerRes.id).toEqual(answer.id);
  });

  it('Get answer with wrong answer id', async () => {
    await supertest(app)
      .get(`/api/answers/12345/get`)
      .expect(404);
  });
});