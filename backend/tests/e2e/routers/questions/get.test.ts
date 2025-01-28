import { PrismaQuestionRepositoryDI, PrismaTagRepositoryDI, PrismaTransactionDI, PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { QuestionGetResponse } from '@cloneoverflow/common';
import { Question, Tag } from '@core/domain/entities';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { TagUtils } from '@tests/e2e/utils/TagUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('GET /api/questions/:questionId', () => {
  let question: Question;
  let tag: Tag;
  
  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);
    const questionUtils = new QuestionUtils(PrismaQuestionRepositoryDI, PrismaTransactionDI);
    const tagUtils = new TagUtils(PrismaTagRepositoryDI, PrismaTransactionDI);
    
    const owner = await userUtils.create();
    question = await questionUtils.create({ ownerId: owner.id });
    tag = await tagUtils.create({ questionId: question.id });
  });

  test('Expect it returns question with tags', async () => {
    const questionResult: QuestionGetResponse = await supertest(app)
      .get(`/api/questions/${question.id}`)
      .expect(200)
      .then(res => res.body);

    expect(questionResult.id);
    expect(questionResult.owner?.id);
    expect(questionResult.title).toEqual(question.title);
    expect(questionResult.text).toEqual(question.text);
    expect(questionResult.rate).toEqual(question.rating);
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