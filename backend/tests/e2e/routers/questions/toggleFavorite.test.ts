import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { Question } from '@core/models/question';
import { FavoriteQuestionRepository } from '@core/repositories';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { QuestionUtils } from '@tests/e2e/utils/QuestionUtils';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('POST/DELETE /api/questions/:questionId/favorite', () => {
  let app: App;
  let userId: string;
  let questionId: string;
  let accessToken: string;
  let favoriteQuestionRepository: FavoriteQuestionRepository;

  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);

    const user = await userUtils.create();
    const question = await new QuestionUtils(nest).create({ ownerId: user.userId });
    
    userId = user.userId;
    questionId = question.questionId;
    accessToken = 'accessToken='+(await userUtils.getTokens(user)).accessToken;
    
    favoriteQuestionRepository = nest.get(PrismaRepositoryDITokens.FavoriteQuestionRepository);
  });

  test('Expect it adds and removes favorite question', async () => {
    await supertest(app)
      .post(`/api/questions/${questionId}/favorite`)
      .set('Cookie', accessToken)
      .expect(201);

    expect(await favoriteQuestionRepository.isFavorite({ 
      questionId, 
      userId,
    })).toBeTruthy();
    
    await supertest(app)
      .delete(`/api/questions/${questionId}/favorite`)
      .set('Cookie', accessToken)
      .expect(200);
      
      expect(await favoriteQuestionRepository.isFavorite({ 
        questionId, 
        userId,
    })).toBeFalsy();
  });
  
  it('When user is unauthorized expect it throws an error 401', async () => {
    await supertest(app)
      .delete(`/api/questions/${questionId}/favorite`)
      .expect(401);
    });

  it('When question does not exist expect it throws an error 404', async () => {
    await supertest(app)
    .delete(`/api/questions/0/favorite`)
    .set('Cookie', accessToken)
    .expect(404);
  });
});