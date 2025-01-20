import { AnswerUserStatusEnum, UserStatusEnum } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { AnswerIncludeOutput } from '@core/domain/repositories/answer/dtos/Params';
import { AnswerGetUseCase } from '@core/services/answer';

describe('Service: test AnswerGetUseCase', () => {
  const ownerInclude: AnswerIncludeOutput['owner'] = {
    id: 'ownerId',
    name: 'name',
    username: 'username',
    rating: 0,
    status: UserStatusEnum.USER,
  };

  const questionInclude: AnswerIncludeOutput['question'] = {
    id: 'questionId',
    ownerId: 'ownerId',
    title: 'title',
    rating: 0,
    isClosed: false,
  };

  test('Get answer', async () => {
    const answer = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });

    const answerRepositoryMock = {
      getAnswer: async ({ where }) => {
        expect(where.answerId).toEqual(answer.id);
        return { 
          entity: answer, 
          owner: ownerInclude, 
          question: questionInclude, 
        };
      },
    } as Partial<AnswerRepository>;

    const answerUserRepositoryMock = {
      getOne: async () => null,
    } as Partial<AnswerUserRepository>;

    const answerGetUseCase = new AnswerGetUseCase(
      answerRepositoryMock as AnswerRepository,
      answerUserRepositoryMock as AnswerUserRepository,
    );

    const { entity, owner, question, voter } = await answerGetUseCase.execute({
      executorId: 'executorId',
      answerId: answer.id,
    });

    expect(entity).toBe(answer);
    expect(owner?.id).toBe(ownerInclude.id);
    expect(question?.id).toBe(questionInclude.id);
    expect(voter).toBeUndefined();
  });

  test('Get answer with voter', async () => {
    const answer = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });

    const voterEntity = AnswerUser.new({
      answerId: 'answerId',
      userId: 'userId',
      status: AnswerUserStatusEnum.VOTER,
    });

    const answerRepositoryMock = {
      getAnswer: async () => ({ 
        entity: answer, 
        owner: ownerInclude,
        question: questionInclude,
      }),
    } as Partial<AnswerRepository>;

    const answerUserRepositoryMock = {
      getOne: async () => voterEntity,
    } as Partial<AnswerUserRepository>;

    const answerGetUseCase = new AnswerGetUseCase(
      answerRepositoryMock as AnswerRepository,
      answerUserRepositoryMock as AnswerUserRepository,
    );

    const { entity, voter } = await answerGetUseCase.execute({
      executorId: 'executorId',
      answerId: 'answerId',
    });

    expect(entity).toBe(answer);
    expect(voter).toBe(voterEntity);
  });
});