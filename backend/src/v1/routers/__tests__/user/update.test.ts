import app from "@/v1/app";
import { User } from "@/v1/tests/utils";
import { UserUpdateDTO } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test updating user router', () => {
  it('Update user', async () => {
    const { user, cookies } = await User.signup();

    const updateData: UserUpdateDTO = {
      name: 'new_name',
      username: 'new_username',
    };

    await supertest(app)
      .patch(`/api/users/${user.id}/update`)
      .set('Cookie', cookies)
      .send(updateData)
      .expect(200);
    
    const res = await supertest(app)
      .get(`/api/users/${user.id}/get`)
      .set('Cookie', cookies)
      .expect(200);
    
    expect(res.body.id).toEqual(user.id);
    expect(res.body.name).toEqual(updateData.name);
    expect(res.body.username).toEqual(updateData.username);
  });

  it('Update with wrong username', async () => {
    const user1 = await User.signup();
    const user2 = await User.signup();

    await supertest(app)
      .patch(`/api/users/${user1.user.id}/update`)
      .set('Cookie', user1.cookies)
      .send({
        username: user2.user.username,
      } as UserUpdateDTO )
      .expect(400);
  });

  it('Update with wrong user id', async () => {
    const { cookies } = await User.signup();
    
    await supertest(app)
      .patch(`/api/users/12345/update`)
      .set('Cookie', cookies)
      .send({
        username: 'username',
      })
      .expect(404);
  });

  it('Update with unauthorized user', async () => {
    const { user } = await User.signup();
    
    await supertest(app)
      .patch(`/api/users/${user.id}/update`)
      .send({
        username: 'username',
      })
      .expect(401);
  });
});