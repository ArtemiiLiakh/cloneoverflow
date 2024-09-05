import app from "@/v1/app";
import { Answer, User } from "@/v1/tests/utils";
import { VoteDTO, VoteType } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test voting answer router', () => {
  it('Vote answer', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();
    const answer = await Answer.createAnswer(user1.cookies);
    
    await supertest(app)
      .patch(`/api/answers/${answer.id}/vote`)
      .set('Cookie', user2.cookies)
      .send({
        vote: VoteType.UP,
      } as VoteDTO)
      .expect(200);

    const answerRes = await Answer.getAnswer(answer.id, user2.cookies);
    const userRes = await User.getUser(user1.user.id, user1.cookies);

    expect(answerRes.voteType).toEqual(VoteType.UP);
    expect(answerRes.rate).toEqual(1);
    expect(userRes.reputation).toEqual(1);
  });

  it('Double vote answer', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();
    const answer = await Answer.createAnswer(user1.cookies);
    
    await supertest(app)
      .patch(`/api/answers/${answer.id}/vote`)
      .set('Cookie', user2.cookies)
      .send({
        vote: VoteType.UP,
      } as VoteDTO)
      .expect(200);

    await supertest(app)
      .patch(`/api/answers/${answer.id}/vote`)
      .set('Cookie', user2.cookies)
      .send({
        vote: VoteType.UP,
      } as VoteDTO)
      .expect(403);

    await supertest(app)
      .patch(`/api/answers/${answer.id}/vote`)
      .set('Cookie', user2.cookies)
      .send({
        vote: VoteType.DOWN,
      } as VoteDTO)
      .expect(200);

    const answerRes = await Answer.getAnswer(answer.id, user2.cookies);
    const userRes = await User.getUser(user1.user.id, user1.cookies);

    expect(answerRes.voteType).toBeNull();
    expect(answerRes.rate).toEqual(0);
    expect(userRes.reputation).toEqual(0);
  });

  it('Vote answer by owner', async () => {
    const { cookies } = await User.signup();
    const answer = await Answer.createAnswer(cookies);

    await supertest(app)
      .patch(`/api/answers/${answer.id}/vote`)
      .set('Cookie', cookies)
      .send({
        vote: VoteType.UP,
      } as VoteDTO)
      .expect(403);
  });

  it('Vote question with wrong id', async () => {
    const { cookies } = await User.signup();

    await supertest(app)
      .patch(`/api/answers/12345/vote`)
      .set('Cookie', cookies)
      .send({
        vote: VoteType.UP,
      } as VoteDTO)
      .expect(404);
  });

  it('Vote question with unauthorized owner', async () => {
    const { cookies } = await User.signup();
    const answer = await Answer.createAnswer(cookies);

    await supertest(app)
      .patch(`/api/answers/${answer.id}/vote`)
      .send({
        vote: VoteType.UP,
      } as VoteDTO)
      .expect(401);
  });
});