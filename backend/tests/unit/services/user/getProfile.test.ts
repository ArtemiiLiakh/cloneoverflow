import { AnswerRepository } from '@core/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { UserRepository } from '@core/repositories/user/UserRepository';
import { UserGetProfileUseCase } from '@core/services/user';
import { createAnswer } from '@tests/utils/models/answer';
import { createQuestion } from '@tests/utils/models/question';
import { createTag } from '@tests/utils/models/tag';
import { createUserProfile } from '@tests/utils/models/user';

describe('User service: test GetProfileUseCase', () => {
  test('Get user profile', async () => {
    const profile = createUserProfile();
    const question =createQuestion();
    const answer = createAnswer();
    const tag = createTag();

    const userRepositoryMock = {
      getProfile: jest.fn().mockResolvedValue(profile),
    } as Partial<UserRepository>;
    
    const questionRepositoryMock = {
      getBestOwnerQuestion: jest.fn().mockResolvedValue({ 
        entity: question,
        tags: [tag],
        answersAmount: 10,
      }),
    } as Partial<QuestionRepository>;
    
    const answerRepositoryMock = {
      getBestOwnerAnswer: jest.fn().mockResolvedValue({
        entity: answer,
        question: {
          questionId: 'questionId',
          ownerId: 'ownerId',
          title: 'title',
          rating: 10,
        },
      }),
    } as Partial<AnswerRepository>;

    const getProfileUseCase = new UserGetProfileUseCase(
      userRepositoryMock as UserRepository, 
      answerRepositoryMock as AnswerRepository, 
      questionRepositoryMock as QuestionRepository,
    );

    const userProfile = await getProfileUseCase.execute({ 
      userId: profile.userId,
    });

    expect(userProfile.user.userId).toEqual(profile.userId);
    expect(userProfile.bestQuestion?.entity).toEqual(question);
    expect(userProfile.bestAnswer?.entity).toEqual(answer);
    
    expect(userRepositoryMock.getProfile).toHaveBeenCalled();
    expect(questionRepositoryMock.getBestOwnerQuestion).toHaveBeenCalled();
    expect(answerRepositoryMock.getBestOwnerAnswer).toHaveBeenCalled();
  });

  test('Get user profile without best question and answer', async () => {
    const profile = createUserProfile();

    const userRepositoryMock = {
      getProfile: jest.fn().mockResolvedValue(profile),
    } as Partial<UserRepository>;
    
    const questionRepositoryMock = {
      getBestOwnerQuestion: jest.fn().mockResolvedValue(null),
    } as Partial<QuestionRepository>;
    
    const answerRepositoryMock = {
      getBestOwnerAnswer: jest.fn().mockResolvedValue(null),
    } as Partial<AnswerRepository>;

    const getProfileUseCase = new UserGetProfileUseCase(
      userRepositoryMock as UserRepository, 
      answerRepositoryMock as AnswerRepository, 
      questionRepositoryMock as QuestionRepository,
    );

    const userProfile = await getProfileUseCase.execute({ 
      userId: profile.userId,
    });

    expect(userProfile.user.userId).toBe(profile.userId);
    expect(userProfile.bestQuestion).toBeNull();
    expect(userProfile.bestAnswer).toBeNull();
    expect(userRepositoryMock.getProfile).toHaveBeenCalled();
    expect(questionRepositoryMock.getBestOwnerQuestion).toHaveBeenCalled();
    expect(answerRepositoryMock.getBestOwnerAnswer).toHaveBeenCalled();
  });
});