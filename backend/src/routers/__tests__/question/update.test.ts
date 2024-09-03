import app from "@/app";
import { Question, User } from "@/tests/utils";
import { QuestionStatus, QuestionUpdateDTO, QuestionUpdateResponse } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test updating question router', () => {
  it('Update question', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies, {
      title: 'title',
      text: 'text',
      tags: ['tag1', 'tag2']
    });

    const updateData: QuestionUpdateDTO = {
      title: 'new title',
      status: QuestionStatus.CLOSED,
      tags: ['tag3']
    };

    const res = await supertest(app)
      .patch(`/api/questions/${question.id}/update`)
      .set('Cookie', cookies)
      .send(updateData)
      .expect(200);
    
    const questionResponse: QuestionUpdateResponse = res.body;
    expect(questionResponse.id).toEqual(question.id);
    expect(questionResponse.title).toEqual(updateData.title);
    expect(questionResponse.status).toEqual(updateData.status);
    expect(questionResponse.tags.map(tag => tag.name)).toEqual(updateData.tags);
  });

  it('Update question with empty tags', async () => {
    const { cookies } = await User.signup();
    const question = await Question.createQuestion(cookies, {
      title: 'title',
      text: 'text',
      tags: ['tag1', 'tag2']
    });

    const updateData: QuestionUpdateDTO = {
      tags: []
    };

    const res = await supertest(app)
      .patch(`/api/questions/${question.id}/update`)
      .set('Cookie', cookies)
      .send(updateData)
      .expect(200);

    const questionResponse: QuestionUpdateResponse = res.body;
    expect(questionResponse.id).toEqual(question.id);
    expect(questionResponse.tags.length).toEqual(0);
  });

  it('Update question with another user', async () => {
    const user1 = await User.signup(); 
    const user2 = await User.signup();
    
    const question = await Question.createQuestion(user1.cookies);

    const updateData: QuestionUpdateDTO = {
      title: 'new title',
    };

    await supertest(app)
      .patch(`/api/questions/${question.id}/update`)
      .set('Cookie', user2.cookies)
      .send(updateData)
      .expect(403);
  });

  it('Update question with wrong question id', async () => {
    const { cookies } = await User.signup(); 
    
    const updateData: QuestionUpdateDTO = {
      title: 'new title',
    };

    await supertest(app)
      .patch(`/api/questions/123456/update`)
      .set('Cookie', cookies)
      .send(updateData)
      .expect(404);
  });

  it('Update question with unauthorized user', async () => {
    const { cookies } = await User.signup(); 
    
    const question = await Question.createQuestion(cookies);

    const updateData: QuestionUpdateDTO = {
      title: 'new title',
    };

    await supertest(app)
      .patch(`/api/questions/${question.id}/update`)
      .send(updateData)
      .expect(401);
  });
});