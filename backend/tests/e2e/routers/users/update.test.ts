import { UserUpdateDTO, UserUpdateResponse } from '@cloneoverflow/common';
import { User } from '@core/models/User';
import { initTestApplication } from '@tests/e2e/initTestApplication';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';
import { App } from 'supertest/types';

describe('PATCH /api/users', () => {
  let app: App;
  let user: User;
  let accessToken: string;
  
  beforeAll(async () => {
    const nest = await initTestApplication();
    app = nest.getHttpServer();

    const userUtils = new UserUtils(nest);

    user = await userUtils.create();
    accessToken = 'accessToken='+(await userUtils.getTokens(user)).accessToken;
  });

  test('Expect it updates user', async () => {
    const updateData: UserUpdateDTO = {
      name: 'newName',
      username: 'newUsername',
      about: 'newAbout',
    };

    const updatedUser: UserUpdateResponse = await supertest(app)
      .patch('/api/users')
      .set('Cookie', accessToken)
      .send(updateData)
      .expect(200)
      .then(res => res.body);

    expect(updatedUser.id).toEqual(user.id);
    expect(updatedUser.name).toEqual(updateData.name);
    expect(updatedUser.username).toEqual(updateData.username);
    expect(updatedUser.about).toEqual(updateData.about);

    user.name = updateData.name ?? user.name;
    user.username = updateData.username ?? user.username;
    user.about = updateData.about ?? user.about;
  });

  test('When username already exists expect it returns error 400', async () => {
    const updateData: UserUpdateDTO = {
      username: user.username,
    };

    await supertest(app)
      .patch('/api/users')
      .set('Cookie', accessToken)
      .send(updateData)
      .expect(400);
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
      .set('Cookie', accessToken)
      .expect(200);
  });
});