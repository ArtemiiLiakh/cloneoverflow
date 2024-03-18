import { UserRepository } from "../repositories/user.repository";
import { UserUpdateDto } from "../dtos/user.update.dto";
import { BadBodyException } from "../utils/exceptions/BadBodyException";
import { NoEntityWithIdException } from "../utils/exceptions/NoEntityWithIdException";
import { UserGASortBy, UserGetAnswersDTO } from '../dtos/user.getAnswers.dto';
import { AnswerRepository } from '../repositories/answer.repository';
import { Prisma } from '@prisma/client';
import { OrderBy } from '../types/OrderBy';
import { DbUtils } from '../utils/DatabaseUtils';
import { DbAnswer } from '../types/database/DbAnswer';
import { UserGQSortBy, UserGetQuestionsDTO } from '../dtos/user.getQuestions.dto';
import { DbQuestion } from '../types/database/DbQuestion';
import { QuestionRepository } from '../repositories/question.repository';

export class UserService {
  constructor(
    private userRepository = new UserRepository(),
    private answerRepository = new AnswerRepository(),
    private questionRepository = new QuestionRepository(),
  ) {}

  async update(userId: string, {name, username, about, reputation, status}: UserUpdateDto) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NoEntityWithIdException('User');
    }
    const userExists = await this.userRepository.find({
      userProfile: {
        username: username,
      }
    })
    if (userExists.userProfile?.userId !== userId) {
      throw new BadBodyException("Username already exists");
    }

    await this.userRepository.updateById(userId, {
      userProfile: {
        update: {
          name: name,
          username: username,
          about: about,
          reputation: reputation,
          status: status,
        }
      }
    })
    return await this.userRepository.findById(userId);
  }

  getAnswers(userId: string, {sortBy, orderBy, pagination}: UserGetAnswersDTO) {
    return DbUtils.paginate<Prisma.AnswerFindManyArgs, DbAnswer>(this.answerRepository, {
      where: {
        userId,
      },
      orderBy: this.getAnswersSortBy(sortBy, orderBy),
    }, pagination ?? {});
  }

  private getAnswersSortBy(sortBy?: UserGASortBy, orderBy?: OrderBy): Prisma.AnswerOrderByWithRelationInput {
    switch (sortBy) {
      case UserGASortBy.RATE:
        return {
          rate: orderBy ?? 'desc',
        };
      case UserGASortBy.DATE:
        return {
          createdAt: orderBy ?? 'asc',
        };
      case UserGASortBy.SOLUTION:
        return {
          isSolution: orderBy ?? 'desc',
        };
    }
    return {};
  }

  getQuestions (userId: string, {sortBy, orderBy, minRate, search, tags, pagination}: UserGetQuestionsDTO) {
    return DbUtils.paginate<Prisma.QuestionFindManyArgs, DbQuestion>(this.questionRepository, {
      where: {
        userId,
        rate: {
          gte: minRate,
        },
        title: {
          contains: search,
        },
        tags: {
          some: {
            name: {
              in: tags,
            },
          },
        },
      },
      orderBy: this.getQuestionsSortBy(sortBy, orderBy),
    }, pagination ?? {});
  }
  
  private getQuestionsSortBy(sortBy?: UserGQSortBy, orderBy?: OrderBy): Prisma.QuestionOrderByWithRelationInput {
    switch (sortBy) {
      case UserGQSortBy.ANSWERS:
        return {
          answers: {
            _count: orderBy ?? 'desc',
          },
        };
      case UserGQSortBy.DATE:
        return {
          createdAt: orderBy ?? 'asc',
        };
      case UserGQSortBy.RATE:
        return {
          rate: orderBy ?? 'desc',
        };
    }
    return {};
  }
}