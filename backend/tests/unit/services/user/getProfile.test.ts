import { Answer } from '@core/domain/entities/Answer';
import { Question } from '@core/domain/entities/Question';
import { User } from '@core/domain/entities/User';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserGetProfileUseCase } from '@core/services/user/usecases/getProfile';

describe('Service: test UserGetProfileUseCase', () => {
  test('Get user profile', async () => {
    const userId = 'userId';
    
    const user = User.new({
      name: 'name',
      username: 'username',
    });

    const question = Question.new({
      ownerId: 'ownerId',
      title: 'title',
      text: 'text',
    });

    const answer = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });

    const userRepositoryMock = {
      getUser: async () => ({ entity: user }),
    } as Partial<UserRepository>;
    
    const questionRepositoryMock = {
      isExist: async () => true,
      getPartialQuestion: async () => ({ entity: question }),
    } as Partial<QuestionRepository>;
    
    const answerRepositoryMock = {
      isExist: async () => true,
      getPartialAnswer: async () => ({ entity: answer, question }),
    } as Partial<AnswerRepository>;

    const getProfileUseCase = new UserGetProfileUseCase(
      userRepositoryMock as UserRepository, 
      answerRepositoryMock as AnswerRepository, 
      questionRepositoryMock as QuestionRepository,
    );

    const userProfile = await getProfileUseCase.execute({ userId });
    expect(userProfile.user).toBe(user);
    expect(userProfile.questionsAmount).toEqual(0);
    expect(userProfile.answersAmount).toEqual(0);

    expect(userProfile.bestQuestion?.entity.questionId).toEqual(question.id);
    expect(userProfile.bestQuestion?.tags).toEqual([]);
    expect(userProfile.bestQuestion?.answersAmount).toEqual(0);
    
    expect(userProfile.bestAnswer?.entity.answerId).toEqual(answer.id);
  });

  test('Get user profile without best question and answer', async () => {
    const userId = 'userId';
    
    const user = User.new({
      name: 'name',
      username: 'username',
    });

    const userRepositoryMock = {
      getUser: async () => ({ entity: user }),
    } as Partial<UserRepository>;
    
    const questionRepositoryMock = {
      isExist: async () => false,
    } as Partial<QuestionRepository>;
    
    const answerRepositoryMock = {
      isExist: async () => false,
    } as Partial<AnswerRepository>;

    const getProfileUseCase = new UserGetProfileUseCase(
      userRepositoryMock as UserRepository, 
      answerRepositoryMock as AnswerRepository, 
      questionRepositoryMock as QuestionRepository,
    );

    const userProfile = await getProfileUseCase.execute({ userId });
    expect(userProfile.user).toBe(user);
    expect(userProfile.questionsAmount).toEqual(0);
    expect(userProfile.answersAmount).toEqual(0);

    expect(userProfile.bestQuestion).toBeNull();
    expect(userProfile.bestAnswer).toBeNull();
  });
});