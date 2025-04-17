import { QuestionUpdateDTO, QuestionUpdateResponse } from '@cloneoverflow/common';
import { Question } from '@core/models/question/Question';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { TagUtils } from '@tests/e2e/utils/TagUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('PATCH /api/questions', () => {
  let question: Question;
  let accessToken: string;
  let userUtils: UserUtils;
  let questionUtils: QuestionUtils;
  let tagUtils: TagUtils;
  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    userUtils = new UserUtils(nest);
    questionUtils = new QuestionUtils(nest);
    tagUtils = new TagUtils(nest);
    
    const owner = await userUtils.create();
    question = await questionUtils.create({
      ownerId: owner.userId,
    });
    accessToken = 'accessToken='+(await userUtils.getTokens(owner)).accessToken;
  });

  test('Expect it updates question with new tags', async () => {
    const newTag = 'newTag';
    const updateData: QuestionUpdateDTO = {
      title: 'newTitle',
      text: 'newText',
      tags: [newTag],
    };

    const newQuestion: QuestionUpdateResponse = await supertest(app)
      .patch(`/api/questions/${question.questionId}`)
      .set('Cookie', accessToken)
      .send(updateData)
      .expect(200)
      .then(res => res.body);

    expect(newQuestion.id).toEqual(question.questionId);
    expect(newQuestion.title).toEqual(updateData.title);
    expect(newQuestion.text).toEqual(updateData.text);

    const questionTags = await tagUtils.getByQuestion(newQuestion.id);

    expect(questionTags?.length).toEqual(1);
    expect(questionTags?.at(0)?.name).toEqual(newTag);

    question = await questionUtils.getQuestion(question.questionId).then(question => question!);
    await tagUtils.delete(newTag);
  });

  test('Expect it removes tags from question if empty array is passed', async () => {
    const tag = await tagUtils.create({ 
      questionId: question.questionId,
    });

    const questionTags = await tagUtils.getByQuestion(question.questionId);
    const updateData: QuestionUpdateDTO = { tags: [] };

    expect(questionTags.at(0)?.id).toEqual(tag.id);

    await supertest(app)
      .patch(`/api/questions/${question.questionId}`)
      .set('Cookie', accessToken)
      .send(updateData)
      .expect(200);

    expect((await tagUtils.getByQuestion(question.questionId)).length).toEqual(0);

    await tagUtils.delete(tag.name);
  });

  test('Expect it does not updates question if update body is empty', async () => {
    const updatedQuestion: QuestionUpdateResponse = await supertest(app)
      .patch(`/api/questions/${question.questionId}`)
      .set('Cookie', accessToken)
      .send({})
      .expect(200)
      .then((res) => res.body);

    expect(updatedQuestion.id).toEqual(question.questionId);    
    expect(updatedQuestion.title).toEqual(question.title);    
    expect(updatedQuestion.text).toEqual(question.text);    
    expect(updatedQuestion.rating).toEqual(question.rating);    
    expect(updatedQuestion.isClosed).toEqual(question.isClosed);    
    expect(updatedQuestion.views).toEqual(question.views);    
  });

  test('When user is unauthorized expect it returns error 401', async () => {
    await supertest(app)
      .patch(`/api/questions/${question.questionId}`)
      .set('Cookie', 'accessToken=invalidToken')
      .expect(401);

    await supertest(app)
      .patch(`/api/questions/${question.questionId}`)
      .expect(401);
  });

  test('Expect it updates question when user is owner or his rating more than was passed', async () => {
    const user = await userUtils.create({ rating: 0 });
    const userAccessToken = 'accessToken='+(await userUtils.getTokens(user)).accessToken;

    await supertest(app)
      .patch(`/api/questions/${question.questionId}`)
      .set('Cookie', userAccessToken)
      .expect(403);
  });

  test('When question id is wrong expect it returns 404 or 400', async () => {
    await supertest(app)
      .patch('/api/questions/0')
      .set('Cookie', accessToken)
      .expect(404);

    await supertest(app)
      .patch('/api/questions/wrongId')
      .set('Cookie', accessToken)
      .expect(400);
  });
});