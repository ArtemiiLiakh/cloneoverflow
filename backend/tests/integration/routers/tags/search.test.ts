import { OrderByEnum, SearchTagsSortByEnum } from '@cloneoverflow/common';
import { SearchTagsQuery, SearchTagsResponse } from '@cloneoverflow/common/api/search';
import { Tag } from '@core/tag';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { QuestionUtils } from '@tests/integration/utils/QuestionUtils';
import { TagUtils } from '@tests/integration/utils/TagUtils';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('GET /api/tags/search', () => {
  let tag1: Tag;
  let tag2: Tag;
  let app: App;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);
    const questionUtils = new QuestionUtils(nest);
    const tagUtils = new TagUtils(nest);

    const owner = await userUtils.create();
    const question = await questionUtils.create({
      ownerId: owner.userId,
    });

    tag1 = await tagUtils.create({ name: 'tag1' });
    tag2 = await tagUtils.create({ name: 'tag2', questionId: question.questionId });
  });
  
  test('Expect it search tags with default options', async () => {
    const res: SearchTagsResponse = await supertest(app)
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
    const options: SearchTagsQuery = {
      sortBy: SearchTagsSortByEnum.NAME,
      orderBy: OrderByEnum.ASC,
    };
    
    const res: SearchTagsResponse = await supertest(app)
      .get('/api/tags/search')
      .query(options)
      .expect(200)
      .then(res => res.body);

    expect(res.tags).toHaveLength(2);
    expect(res.tags.at(0)?.id).toEqual(tag1.id);
    expect(res.tags.at(1)?.id).toEqual(tag2.id);
  });

  test('Expect it returns empty array if no tags found', async () => {
    const options: SearchTagsQuery = {
      name: 'tag 3',
      sortBy: SearchTagsSortByEnum.NAME,
      orderBy: OrderByEnum.ASC,
    };

    const res: SearchTagsResponse = await supertest(app)
      .get('/api/tags/search')
      .query(options)
      .expect(200)
      .then(res => res.body);

    expect(res.tags).toHaveLength(0);
  });
});