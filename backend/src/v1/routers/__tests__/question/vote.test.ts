import app from "@/v1/app";
import { Question, User } from "@/v1/tests/utils";
import { VoteDTO, VoteType } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test voting question router', () => {
  it('Vote question', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();
    const question = await Question.createQuestion(user1.cookies);
    
    await supertest(app)
      .patch(`/api/questions/${question.id}/vote`)
      .set('Cookie', user2.cookies)
      .send({
        vote: VoteType.UP,
      } as VoteDTO)
      .expect(200);

    const questionRes = await Question.getQuestion(question.id, user2.cookies)
    const userRes = await User.getUser(user1.user.id, user1.cookies);

    expect(questionRes.voteType).toEqual(VoteType.UP);
    expect(questionRes.rate).toEqual(1);
    expect(userRes.reputation).toEqual(1);
  });

  it('Double vote question', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();
    const question = await Question.createQuestion(user1.cookies);
    
    await supertest(app)
      .patch(`/api/questions/${question.id}/vote`)
      .set('Cookie', user2.cookies)
      .send({
        vote: VoteType.UP,
      } as VoteDTO)
      .expect(200);

    await supertest(app)
      .patch(`/api/questions/${question.id}/vote`)
      .set('Cookie', user2.cookies)
      .send({
        vote: VoteType.UP,
      } as VoteDTO)
      .expect(403);

    await supertest(app)
      .patch(`/api/questions/${question.id}/vote`)
      .set('Cookie', user2.cookies)
      .send({
        vote: VoteType.DOWN,
      } as VoteDTO)
      .expect(200);

    const questionRes = await Question.getQuestion(question.id, user2.cookies);
    const userRes = await User.getUser(user1.user.id, user1.cookies);

    expect(questionRes.voteType).toBeNull();
    expect(questionRes.rate).toEqual(0);
    expect(userRes.reputation).toEqual(0);
  });

  it('Vote question by owner', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);

    await supertest(app)
      .patch(`/api/questions/${question.id}/vote`)
      .set('Cookie', cookies)
      .send({
        vote: VoteType.UP,
      } as VoteDTO)
      .expect(403);
  });

  it('Vote question with wrong id', async () => {
    const { cookies } = await User.signup();

    await supertest(app)
      .patch(`/api/questions/12345/vote`)
      .set('Cookie', cookies)
      .send({
        vote: VoteType.UP,
      } as VoteDTO)
      .expect(404);
  });

  it('Vote question with unauthorized owner', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);

    await supertest(app)
      .patch(`/api/questions/${question.id}/vote`)
      .send({
        vote: VoteType.UP,
      } as VoteDTO)
      .expect(401);
  });
});