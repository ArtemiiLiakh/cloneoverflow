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
import { DbUserGetProfile } from '../types/database/DbUser';

export class UserService {
  constructor(
    private userRepository = new UserRepository(),
    private answerRepository = new AnswerRepository(),
    private questionRepository = new QuestionRepository(),
  ) {}

  async get(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NoEntityWithIdException('User');
    }
    return user;
  }

  async update(userId: string, {name, username, about}: UserUpdateDto) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NoEntityWithIdException('User');
    }

    if (username) {
      const userExists = await this.userRepository.find({
        userProfile: {
          username,
        }
      })
      if (userExists && userExists.id !== userId) {
        throw new BadBodyException("Username already exists");
      }
    }

    return await this.userRepository.updateById(userId, {
      userProfile: {
        update: {
          name,
          username,
          about,
        }
      }
    });
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findById<DbUserGetProfile>(userId, {
      include: {
        userProfile: {
          include: {
            _count: {
              select: {
                answers: true,
                questions: true,
              },
            },
            answers: {
              take: 1,
              orderBy: {
                rate: 'desc',
              },
              include: {
                question: true,
              }
            },
            questions: {
              take: 1,
              include: {
                _count: {
                  select: {
                    answers: true,
                  },
                },
                tags: true,
              },
              orderBy: {
                rate: 'desc',
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NoEntityWithIdException('User');
    }

    return user;
  }

  getAnswers(userId: string, {sortBy, orderBy, questionTitle, pagination}: UserGetAnswersDTO) {
    return DbUtils.paginate<Prisma.AnswerFindManyArgs, DbAnswer>(this.answerRepository, {
      where: {
        userId,
        question: {
          title: {
            contains: questionTitle,
            mode: 'insensitive',
          },
        },
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

  getQuestions (userId: string, {sortBy, orderBy, search, tags, pagination}: UserGetQuestionsDTO) {
    return DbUtils.paginate<Prisma.QuestionFindManyArgs, DbQuestion>(this.questionRepository, {
      where: {
        userId,
        title: {
          contains: search,
          mode: 'insensitive',
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