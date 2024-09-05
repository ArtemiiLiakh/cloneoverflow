import app from "@/v1/app";
import { Answer, Question, User } from "@/v1/tests/utils";
import { UserGetProfileResponse, UserStatus } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test getting user profile router', () => {
  it('Get user profile', async () => {
    const { user, cookies } = await User.signup();
    
    const res = await supertest(app)
      .get(`/api/users/${user.id}/profile`)
      .set('Cookie', cookies)
      .expect(200);
    
    const profile: UserGetProfileResponse = res.body;

    expect(profile.id).toEqual(user.id);
    expect(profile.status).toEqual(UserStatus.USER);
  });

  it('Get user profile with question and answers', async () => {
    const { user, cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);
    const answer = await Answer.createAnswer(cookies, {
      questionId: question.id,
      text: 'asnwer text'
    });

    const res = await supertest(app)
      .get(`/api/users/${user.id}/profile`)
      .set('Cookie', cookies)
      .expect(200);
    
    const profile: UserGetProfileResponse = res.body;

    expect(profile.id).toEqual(user.id);
    expect(profile.bestQuestion?.id).toEqual(question.id);
    expect(profile.bestAnswer?.id).toEqual(answer.id);
    expect(profile.questionsAmount).toEqual(1);
    expect(profile.answersAmount).toEqual(1);
  });

  it('Get user profile with wrong user id', async () => {
    const { cookies } = await User.signup();

    await supertest(app)
      .get(`/api/users/123456/profile`)
      .set('Cookie', cookies)
      .expect(404);
  });

  it('Get user profile with unauthorized user', async () => {
    const { user } = await User.signup();

    await supertest(app)
      .get(`/api/users/${user.id}/profile`)
      .expect(401);
  });
});