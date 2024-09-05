import app from "@/v1/app";
import { Answer, Question, User } from "@/v1/tests/utils";
import { QuestionCloseDTO } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test deleting question router', () => {
  it('Delete question', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);

    await supertest(app)
      .delete(`/api/questions/${question.id}/delete`)
      .set('Cookie', cookies)
      .expect(200);

    await supertest(app)
      .get(`/api/questions/${question.id}/get`)
      .expect(404);
  });

  it('Delete closed question', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);
    const answer = await Answer.createAnswer(cookies, {
      questionId: question.id,
      text: 'asnwer',
    });

    await supertest(app)
      .patch(`/api/questions/${question.id}/close`)
      .set('Cookie', cookies)
      .send({
        answerId: answer.id,
      } as QuestionCloseDTO)
      .expect(200);

    await supertest(app)
      .delete(`/api/questions/${question.id}/delete`)
      .set('Cookie', cookies)
      .expect(200);

    await supertest(app)
      .get(`/api/questions/${question.id}/get`)
      .expect(404);
    
    await supertest(app)
      .get(`/api/answers/${answer.id}/get`)
      .expect(404);
  });

  it('Delete question with another user', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();
    const question = await Question.createQuestion(user1.cookies);

    const res = await supertest(app)
      .delete(`/api/questions/${question.id}/delete`)
      .set('Cookie', user2.cookies)
      .expect(403);

    expect(res.body.name).toEqual('ForbiddenException');
  });

  it('Delete question with wrong id', async () => {
    const { cookies } = await User.signup();

    await supertest(app)
      .delete(`/api/questions/123456/delete`)
      .set('Cookie', cookies)
      .expect(404);
  });

  it('Delete question with unauthorized user', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);

    const res = await supertest(app)
      .delete(`/api/questions/${question.id}/delete`)
      .expect(401);

    expect(res.body.name).toEqual('UnauthorizedException');
  });
});