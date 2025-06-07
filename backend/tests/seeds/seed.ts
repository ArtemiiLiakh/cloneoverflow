import config from '@/config';
import { DatabaseDITokens } from '@web/di/tokens/DatabaseDITokens';
import { AnswerUseCaseDITokens, AuthUseCaseDITokens, QuestionUseCaseDITokens } from '@web/di/tokens/services';
import { ICreateAccountUseCase } from '@application/auth/usecases/types';
import { VoteTypeEnum } from '@cloneoverflow/common';
import { IAnswerVoteUseCase } from '@application/answer/usecases/types';
import { IQuestionAddViewerUseCase, IQuestionVoteUseCase } from '@application/question/usecases/types';
import { PrismaClient } from '@prisma/client';
import { initTestApplication } from '@tests/integration/initTestApplication';
import { clearDatabase } from '@tests/utils/clearDatabase';
import { randomInt } from 'crypto';
import { RedisClientType } from 'redis';

let prismaClient: PrismaClient;
let redisClient: RedisClientType;

const main = async () => {
  const nest = await initTestApplication();

  prismaClient = nest.get(DatabaseDITokens.PrismaClient);
  redisClient = nest.get(DatabaseDITokens.RedisClient);

  if (process.argv.at(-1) === '--prune') {
    await clearDatabase(prismaClient, redisClient);
    console.log('Cleared database');
  }

  const createAccount: ICreateAccountUseCase = nest.get(AuthUseCaseDITokens.CreateAccount);
  const questionVote: IQuestionVoteUseCase = nest.get(QuestionUseCaseDITokens.Vote);
  const questionAddViewer: IQuestionAddViewerUseCase = nest.get(QuestionUseCaseDITokens.AddViewer);
  const answerVote: IAnswerVoteUseCase = nest.get(AnswerUseCaseDITokens.Vote);

  const [user1, user2, user3] = await createUsers(createAccount);
  
  await prismaClient.user.update({
    where: {
      id: user1.user.userId,
    },
    data: {
      rating: 100000,
    },
  });
  await prismaClient.user.update({
    where: {
      id: user3.user.userId,
    },
    data: {
      rating: 10,
    },
  });
  
  console.log('Created users');

  const questions = await createQuestions(user1.user.userId);
  console.log('Created questions');

  await questionVote.execute({
    executorId: user2.user.userId,
    questionId: questions[0].id.toString(),
    vote: VoteTypeEnum.UP,
  });
  
  await questionAddViewer.execute({
    executorId: user2.user.userId,
    questionId: questions[0].id.toString(),
  });

  await Promise.all(
    questions.map(async (question) => {
      const answers = await createAnswers(user2.user.userId, question.id);
      console.log(`Created answers for question ${question.id}`);

      await answerVote.execute({ 
        executorId: user1.user.userId, 
        answerId: answers[0].id.toString(), 
        vote: randomInt(0, 1) ? VoteTypeEnum.UP : VoteTypeEnum.DOWN,
      });
    }),
  );

  console.log('Done');

  await prismaClient.$disconnect();
  await redisClient.disconnect();
  await nest.close();
};

main();

function createUsers (createAccount: ICreateAccountUseCase) {
  return Promise.all([
    createAccount.execute({
      email: config.SEED_EMAIL!,
      password: 'q12345678',
      name: 'name',
      username: 'username1',
      about: 'about',
    }),
    createAccount.execute({
      email: 'example@gmail.com',
      password: 'q12345678',
      name: 'name',
      username: 'username2',
      about: 'about',
    }),
    createAccount.execute({
      email: 'example2@gmail.com',
      password: 'q12345678',
      name: 'name',
      username: 'username3',
      about: 'about',
    }),
  ]);
}

async function createQuestions (ownerId: string) {
  await Promise.all([
    prismaClient.tag.createMany({
      data: [
        { name: 'tag1' },
        { name: 'tag2' },
        { name: 'tag3' },
      ],
    }),
  ]);

  return Promise.all([
    prismaClient.question.create({
      data: {
        ownerId,
        title: 'title',
        tags: {
          connect: [{ name: 'tag1' }],
        },
      },
    }),
    prismaClient.question.create({
      data: {
        ownerId,
        title: 'title',
        rating: -10,
        tags: {
          connect: [
            { name: 'tag1' },
            { name: 'tag2' },
          ],
        },
      },
    }),
    prismaClient.question.create({
      data: {
        ownerId,
        title: 'title',
        rating: 100,
        views: 100,
        tags: {
          connect: [
            { name: 'tag1' }, 
            { name: 'tag2' }, 
            { name: 'tag3' },
          ],
        },
      },
    }),
    prismaClient.question.create({
      data: {
        ownerId,
        title: 'title',
        rating: 10,
        views: 150,
      },
    }),
    prismaClient.question.create({
      data: {
        ownerId,
        title: 'title',
        rating: -1,
        isClosed: true,
        views: 100,
        tags: {
          connect: [{
            name: 'tag1',
          }],
        },
      },
    }),
    prismaClient.question.create({
      data: {
        ownerId,
        title: 'title',
        isClosed: true,
        views: 10,
        tags: {
          connect: [{
            name: 'tag1',
          }],
        },
      },
    }),
  ]);  
}

function createAnswers (ownerId: string, questionId: number) {
  return Promise.all([
    prismaClient.answer.create({
      data: {
        ownerId,
        questionId: +questionId,
        text: 'text',
      },
    }),
    prismaClient.answer.create({
      data: {
        ownerId,
        questionId: +questionId,
        text: 'text',
        rating: 10,
      },
    }),
    prismaClient.answer.create({
      data: {
        ownerId,
        questionId,
        text: 'text',
        rating: -1,
      },
    }),
  ]);
}