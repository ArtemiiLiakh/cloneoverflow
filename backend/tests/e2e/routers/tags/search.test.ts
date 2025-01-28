import { PrismaQuestionRepositoryDI, PrismaTagRepositoryDI, PrismaTransactionDI, PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { OrderByEnum, SearchTagsDTO, SearchTagsReponse, SearchTagsSortByEnum } from '@cloneoverflow/common';
import { Tag } from '@core/domain/entities';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { TagUtils } from '@tests/e2e/utils/TagUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('GET /api/tags/search', () => {
  let tag1: Tag;
  let tag2: Tag;

  beforeAll(async () => {
    const userUtils = new UserUtils(PrismaUserRepositoryDI);
    const questionUtils = new QuestionUtils(PrismaQuestionRepositoryDI, PrismaTransactionDI);
    const tagUtils = new TagUtils(PrismaTagRepositoryDI, PrismaTransactionDI);

    const owner = await userUtils.create();
    const question = await questionUtils.create({ ownerId: owner.id });

    tag1 = await tagUtils.create({ name: 'tag1' });
    tag2 = await tagUtils.create({ name: 'tag2', questionId: question.id });
  });
  
  test('Expect it search tags with default options', async () => {
    const res: SearchTagsReponse = await supertest(app)
      .get('/api/tags/search')
      .expect(200)
      .then(res => res.body);

    expect(res.tags).toHaveLength(2);
    expect(res.tags.at(0)?.id).toEqual(tag2.id);
    expect(res.tags.at(1)?.id).toEqual(tag1.id);
  
    expect(res.tags.at(0)?.questionsAmount).toEqual(1);
    expect(res.tags.at(1)?.questionsAmount).toEqual(0);
  });

  test('Expect it search tags with certain options', async () => {
    const options: SearchTagsDTO = {
      sortBy: SearchTagsSortByEnum.NAME,
      orderBy: OrderByEnum.ASC,
    };
    
    const res: SearchTagsReponse = await supertest(app)
      .get('/api/tags/search')
      .query(options)
      .expect(200)
      .then(res => res.body);

    expect(res.tags).toHaveLength(2);
    expect(res.tags.at(0)?.id).toEqual(tag1.id);
    expect(res.tags.at(1)?.id).toEqual(tag2.id);
  });

  test('Expect it returns empty array if no tags found', async () => {
    const options: SearchTagsDTO = {
      name: 'tag 3',
      sortBy: SearchTagsSortByEnum.NAME,
      orderBy: OrderByEnum.ASC,
    };

    const res: SearchTagsReponse = await supertest(app)
      .get('/api/tags/search')
      .query(options)
      .expect(200)
      .then(res => res.body);

    expect(res.tags).toHaveLength(0);
  });
});