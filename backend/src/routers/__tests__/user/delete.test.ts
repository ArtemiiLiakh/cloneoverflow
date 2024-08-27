import app from "@/app";
import { Answer, Question, User } from "@/tests/utils";
import { UserDeleteDTO } from "@cloneoverflow/common";
import supertest from "supertest";

describe('Test deleting user router', () => {
  it('Delete user', async () => {
    const { user, cookies } = await User.signup({
      email: 'email@gmail.com',
      password: 'password',
      name: 'name',
      username: 'username',
    });
    
    await supertest(app)
      .delete(`/api/users/${user.id}/delete`)
      .set('Cookie', cookies)
      .send({
        email: 'email@gmail.com',
        password: 'password',
      } as UserDeleteDTO)
      .expect(200);

    await supertest(app)
      .get(`/api/users/${user.id}/get`)
      .set('Cookie', cookies)
      .expect(404);
  });

  it('Delete user with questions and answers', async () => {
    const { user, cookies } = await User.signup({
      email: 'email@gmail.com',
      password: 'password',
      name: 'name',
      username: 'username',
    });
    const question = await Question.createQuestion(cookies);
    const answer = await Answer.createAnswer(cookies, {
      questionId: question.id,
      text: 'answer',
    });
    
    await supertest(app)
      .delete(`/api/users/${user.id}/delete`)
      .set('Cookie', cookies)
      .send({
        email: 'email@gmail.com',
        password: 'password',
      } as UserDeleteDTO)
      .expect(200);

    await supertest(app)
      .get(`/api/users/${user.id}/get`)
      .set('Cookie', cookies)
      .expect(404);
      
    await supertest(app)
      .get(`/api/questions/${question.id}/get`)
      .expect(404);
    
    await supertest(app)
      .get(`/api/answers/${answer.id}/get`)
      .expect(404);
  });

  it('Delete user with wrong email', async () => {
    const { cookies, user } = await User.signup({
      email: 'email@gmail.com',
      password: 'password',
      name: 'name',
      username: 'username',
    });

    await supertest(app)
      .delete(`/api/users/${user.id}/delete`)
      .set('Cookie', cookies)
      .send({
        email: 'wrong@gmail.com',
        password: 'password',
      })
      .expect(400);
  });

  it('Delete user with wrong authorized user', async () => {
    const user1 = await User.signup({
      email: 'email@gmail.com',
      password: 'password',
      name: 'name',
      username: 'username',
    });
    const user2 = await User.signup();
    
    await supertest(app)
      .delete(`/api/users/${user1.user.id}/delete`)
      .set('Cookie', user2.cookies)
      .send({
        email: 'email@gmail.com',
        password: 'password',
      })
      .expect(403);
  });

  it('Delete user with wrong user id', async () => {
    const { cookies } = await User.signup();
    
    await supertest(app)
      .delete(`/api/users/12345/delete`)
      .set('Cookie', cookies)
      .send({
        email: 'email@gmail.com',
        password: 'password',
      })
      .expect(400);
  });
});