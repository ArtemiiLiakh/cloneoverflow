import { UserUpdateBody } from '@cloneoverflow/common/api/user';
import { User } from '@core/user/User';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { UserUtils } from '@tests/integration/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('PATCH /api/users', () => {
  let app: App;
  let user: User;
  let userAuthTokens: string;
  let userUtils: UserUtils;
  
  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    userUtils = new UserUtils(nest);

    user = await userUtils.create();

    const tokens = await userUtils.getTokens(user);
    userAuthTokens = tokens.accessToken + ';' + tokens.refreshToken;
  });

  test('Expect it updates user', async () => {
    const updateData: UserUpdateBody = {
      name: 'newName',
      username: 'newUsername',
      about: 'newAbout',
    };

    await supertest(app)
      .patch('/api/users')
      .set('Cookie', userAuthTokens)
      .send(updateData)
      .expect(204);

    const updatedUser = await userUtils.getUser(user.userId);

    expect(updatedUser).not.toBeNull();
    expect(updatedUser!.name).toEqual(updateData.name);
    expect(updatedUser!.username).toEqual(updateData.username);

    user.name = updateData.name ?? user.name;
    user.username = updateData.username ?? user.username;
  });

  test('When username already exists expect it returns error 403', async () => {
    const updateData: UserUpdateBody = {
      username: user.username,
    };

    await supertest(app)
      .patch('/api/users')
      .set('Cookie', userAuthTokens)
      .send(updateData)
      .expect(403);
  });

  test('When user is unauthorized or accessToken is wrong expect it returns error 401', async () => {
    await supertest(app)
      .patch('/api/users')
      .set('Cookie', 'accessToken=wrongToken')
      .expect(401);

    await supertest(app)
      .patch('/api/users')
      .expect(401);
  });

  test('Expect it returns 200 if update body is empty', async () => {
    await supertest(app)
      .patch('/api/users')
      .set('Cookie', userAuthTokens)
      .expect(204);
  });
});