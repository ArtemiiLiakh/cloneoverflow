import app from "@/v1/app";
import { User } from "@/v1/tests/utils";
import { QuestionCreateDTO, QuestionCreateResponse, QuestionStatus } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test creating question router', () => {
  it('Create question', async () => {
    const { cookies, user } = await User.signup();

    const data: QuestionCreateDTO = {
      title: 'question',
      text: 'text',
      tags: ['tag1', 'tag2'],
    };

    const res = await supertest(app)
      .post('/api/questions/create')
      .set('Cookie', cookies)
      .send(data)
      .expect(201);

    const question: QuestionCreateResponse = res.body;

    expect(question.user.id).toEqual(user.id);
    expect(question.title).toEqual(data.title);
    expect(question.text).toEqual(data.text);
    expect(question.status).toEqual(QuestionStatus.ACTIVE);
    expect(question.tag.findIndex(tag => tag.name === data.tags[0])).not.toEqual(-1);
    expect(question.tag.findIndex(tag => tag.name === data.tags[1])).not.toEqual(-1);
  });

  it('Create question with unauthorized user', async () => {
    const data: QuestionCreateDTO = {
      title: 'question',
      text: 'text',
      tags: ['tag1', 'tag2'],
    };

    await supertest(app)
      .post('/api/questions/create')
      .send(data)
      .expect(401);
  });
});