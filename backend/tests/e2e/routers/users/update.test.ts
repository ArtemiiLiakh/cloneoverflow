import { PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { app } from '@application/http-rest/server';
import { UserUpdateDTO, UserUpdateResponse } from '@cloneoverflow/common';
import { User } from '@core/domain/entities/User';
import { UserUtils } from '@tests/e2e/utils/UserUtils';
import supertest from 'supertest';

describe('PATCH /api/users', () => {
  let user: User;
  let accessToken: string;
  const userUtils = new UserUtils(PrismaUserRepositoryDI);
  
  beforeAll(async () => {
    user = await userUtils.create();
    accessToken = await userUtils.getTokens(user).then(tokens => 'accessToken='+tokens.accessToken);
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