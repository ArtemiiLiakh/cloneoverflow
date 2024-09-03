import app from "@/app";
import { Answer, Question, User } from "@/tests/utils";
import { OrderBy, QuestionAnswersSortBy, QuestionGetDTO, QuestionGetResponse, QuestionStatus, VoteType } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test getting question router', () => {
  it('Get question by id', async () => {
    const { user, cookies } = await User.signup();
    const question = await Question.createQuestion(cookies);

    const res = await supertest(app)
      .get(`/api/questions/${question.id}/get`)
      .expect(200);

    const questionResponse: QuestionGetResponse = res.body;
    expect(questionResponse.id).toEqual(question.id);
    expect(questionResponse.owner.id).toEqual(user.id);
    expect(questionResponse.status).toEqual(QuestionStatus.ACTIVE);
  });

  it('Get question with answers', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();
    const question = await Question.createQuestion(user1.cookies);
    
    const answer1 = await Answer.createAnswer(user1.cookies, {
      questionId: question.id,
      text: 'answer',
    });
    const answer2 = await Answer.createAnswer(user2.cookies, {
      questionId: question.id,
      text: 'answer',
    });

    const res = await supertest(app)
      .get(`/api/questions/${question.id}/get`)
      .expect(200);

    const questionResponse: QuestionGetResponse = res.body;
    
    expect(questionResponse.id).toEqual(question.id);
    expect(questionResponse.owner.id).toEqual(user1.user.id);
    expect(questionResponse.answers.findIndex(answer => answer.id === answer1.id)).not.toEqual(-1);
    expect(questionResponse.answers.findIndex(answer => answer.id === answer2.id)).not.toEqual(-1);
  });

  it('Get question with answer sortings', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();
    const question = await Question.createQuestion(user1.cookies);
    
    const answer1 = await Answer.createAnswer(user1.cookies, {
      questionId: question.id,
      text: 'answer',
    });
    const answer2 = await Answer.createAnswer(user2.cookies, {
      questionId: question.id,
      text: 'answer',
    });

    const res = await supertest(app)
      .get(`/api/questions/${question.id}/get`)
      .query({
        answers: {
          sortBy: QuestionAnswersSortBy.DATE,
          orderBy: OrderBy.DESC,
        }
      } as QuestionGetDTO)
      .expect(200);

    const questionResponse: QuestionGetResponse = res.body;
    
    expect(questionResponse.id).toEqual(question.id);
    expect(questionResponse.owner.id).toEqual(user1.user.id);
    expect(questionResponse.answers[0].id).toEqual(answer2.id);
    expect(questionResponse.answers[1].id).toEqual(answer1.id);
  });

  it('Get question with voter', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();
    const question = await Question.createQuestion(user1.cookies);

    await Question.voteQuestion(user2.cookies, question.id, VoteType.UP);

    const res = await supertest(app)
      .get(`/api/questions/${question.id}/get`)
      .set('Cookie', user2.cookies)
      .expect(200);
    
    const questionResponse: QuestionGetResponse = res.body;
    expect(questionResponse.id).toEqual(question.id);
    expect(questionResponse.owner.id).toEqual(user1.user.id);
    expect(questionResponse.voteType).toEqual(VoteType.UP);
  });

  it('Get question with wrong question id', async () => {
    const { cookies } = await User.signup();
    
    await supertest(app)
      .get(`/api/questions/12345/get`)
      .set('Cookie', cookies)
      .expect(404);
  });
});