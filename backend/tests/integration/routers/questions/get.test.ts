import { QuestionGetResponse } from '@cloneoverflow/common/api/question';
import { Question } from '@core/question';
import { Tag } from '@core/tag';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { TagUtils } from '@tests/integration/utils/TagUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('GET /api/questions/:questionId', () => {
  let app: App;
  let question: Question;
  let tag: Tag;
  
  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);
    const tagUtils = new TagUtils(nest);
    
    const owner = await userUtils.create();
    question = await questionUtils.create({ 
      ownerId: owner.userId,
    });
    
    tag = await tagUtils.create({ 
      questionId: question.questionId,
    });
  });

  test('Expect it returns question with tags', async () => {
    const questionResult: QuestionGetResponse = await supertest(app)
      .get(`/api/questions/${question.questionId}`)
      .expect(200)
      .then(res => res.body);

    expect(questionResult.id);
    expect(questionResult.owner?.id);
    expect(questionResult.title).toEqual(question.title);
    expect(questionResult.text).toEqual(question.text);
    expect(questionResult.rating).toEqual(question.rating);
    expect(questionResult.views).toEqual(question.views);
    expect(questionResult.isClosed).toEqual(question.isClosed);
    expect(questionResult.tags?.length).toEqual(1);
    expect(questionResult.tags?.at(0)).toEqual(tag.name);
  });

  test('When question id is wrong or not found expect it retuns error 400 or 404', async () => {
    await supertest(app)
      .get('/api/questions/0')
      .expect(404);

    await supertest(app)
      .get('/api/questions/wrongId')
      .expect(400);
  });
});