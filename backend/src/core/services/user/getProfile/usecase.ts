import { AnswerRepository, QuestionRepository, UserRepository } from '@core/repositories';
import { UserGetProfileInput, UserGetProfileOutput } from './dto';
import { IUserGetProfileUseCase } from './type';

export class UserGetProfileUseCase implements IUserGetProfileUseCase {
  constructor (
    private userRepository: UserRepository,
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}
 
  async execute ({ userId }: UserGetProfileInput): Promise<UserGetProfileOutput> {
    const profile = await this.userRepository.getProfile({ userId });

    const bestAnswer = await this.answerRepository.getBestOwnerAnswer({
      ownerId: userId,
    });
    
    const bestQuestion = await this.questionRepository.getBestOwnerQuestion({
      ownerId: userId,
    });
  
    return {
      user: {
        userId: profile.userId,
        email: profile.email,
        username: profile.username,
        name: profile.name,
        rating: profile.rating,
        status: profile.status,
        about: profile.about,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
      answerAmount: profile.answerAmount,
      questionAmount: profile.questionAmount,
      bestQuestion,
      bestAnswer,
    };  
  }
}