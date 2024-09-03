import { AnswerRepository } from '@/repositories/answer.repository';
import { QuestionRepository } from '@/repositories/question.repository';
import { UserRepository } from '@/repositories/user.repository';
import { DbAnswerWithQuestion } from '@/types/database/DbAnswer';
import { DbGetAllQuestions } from '@/types/database/DbQuestion';
import { DbUserGetProfile } from '@/types/database/DbUser';
import { TokenPayload } from '@/types/TokenPayload';
import { DbUtils } from '@/utils/DatabaseUtils';
import { compareHash } from '@/utils/hash';
import {
  AuthLoginDTO,
  BadBodyException,
  ForbiddenException,
  NoEntityWithIdException,
  OrderBy,
  UserGASortBy,
  UserGQSortBy,
  UserGetAnswersDTO,
  UserGetQuestionsDTO,
  UserUpdateDTO
} from '@cloneoverflow/common';
import { Prisma, UserAnswerStatus, UserQuestionStatus } from '@prisma/client';

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async get(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NoEntityWithIdException('User');
    }
    return user;
  }

  async update(userId: string, {name, username, about}: UserUpdateDTO) {
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
                userAnswers: {
                  where: {
                    status: UserAnswerStatus.OWNER,
                  },
                },
                userQuestions: {
                  where: {
                    status: UserQuestionStatus.OWNER,
                  },
                },
              },
            },
            userAnswers: {
              take: 1,
              include: {
                answer: {
                  include: {
                    question: true,
                  },
                },
              },
              orderBy: {
                answer: {
                  rate: OrderBy.DESC,
                },
              },
            },
            userQuestions: {
              take: 1,
              include: {
                question: {
                  include: {
                    _count: {
                      select: {
                        answers: true,
                      },
                    },
                    tags: true,
                  },
                },
              },
              orderBy: [
                {
                  question: {
                    rate: OrderBy.DESC,
                  },
                },
                {
                  question: {
                    answers: {
                      _count: OrderBy.DESC,
                    },
                  },
                },
              ],
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

  async getAnswers(userId: string, { sortBy, orderBy, searchText, pagination }: UserGetAnswersDTO) {
    if (!await this.userRepository.findById(userId)) {
      throw new NoEntityWithIdException('User');
    }

    return DbUtils.paginate<Prisma.AnswerFindManyArgs, DbAnswerWithQuestion>(this.answerRepository, {
      where: {
        userAnswers: {
          some: {
            userId,
            status: UserAnswerStatus.OWNER,
          },
        },
        OR: [
          {
            question: {
              title: {
                contains: searchText,
                mode: 'insensitive',
              },
            },
          },
          {
            text: {
              contains: searchText,
              mode: 'insensitive',
            },
          }
        ]
      },
      orderBy: this.getAnswersSortBy(sortBy, orderBy),
      include: {
        question: true,
      }
    }, pagination ?? {});
  }

  private getAnswersSortBy(sortBy?: UserGASortBy, orderBy?: OrderBy): Prisma.AnswerOrderByWithRelationInput {
    switch (sortBy) {
      case UserGASortBy.RATE:
        return {
          rate: orderBy ?? OrderBy.DESC,
        };
      case UserGASortBy.DATE:
        return {
          createdAt: orderBy ?? OrderBy.ASC,
        };
      case UserGASortBy.SOLUTION:
        return {
          isSolution: orderBy ?? OrderBy.DESC,
        };
    }
    return {};
  }

  async getQuestions (userId: string, {sortBy, orderBy, search, tags, pagination}: UserGetQuestionsDTO) {
    if (!await this.userRepository.findById(userId)) {
      throw new NoEntityWithIdException('User');
    }
    
    const titleSearch = search ? {
      contains: search,
      mode: Prisma.QueryMode.insensitive,
    } : undefined;

    const tagSearch = tags?.length ? {
      some: {
        name: {
          in: tags,
        },
      },
    } : undefined;
    
    return DbUtils.paginate<Prisma.QuestionFindManyArgs, DbGetAllQuestions>(this.questionRepository, {
      where: {
        title: titleSearch,
        tags: tagSearch,
        userQuestions: {
          some: {
            userId,
            status: UserQuestionStatus.OWNER,
          },
        }
      },
      orderBy: this.getQuestionsSortBy(sortBy, orderBy),
      include: {
        owner: true,
        tags: true,
        _count: {
          select: {
            answers: true,
          },
        },
      },
    }, pagination ?? {});
  }
  
  private getQuestionsSortBy(sortBy?: UserGQSortBy, orderBy?: OrderBy): Prisma.QuestionOrderByWithRelationInput {
    switch (sortBy) {
      case UserGQSortBy.ANSWERS:
        return {
          answers: {
            _count: orderBy ?? OrderBy.DESC,
          },
        };
      case UserGQSortBy.DATE:
        return {
          createdAt: orderBy ?? OrderBy.ASC,
        };
      case UserGQSortBy.RATE:
        return {
          rate: orderBy ?? OrderBy.DESC,
        };
    }
    return {};
  }

  async delete (userId: string, { email, password }: AuthLoginDTO, user: TokenPayload){
    const confirmUser = await this.userRepository.find({
      email,
    });
    if (!confirmUser){
      throw new BadBodyException("Invalid email or password");
    }
    if (confirmUser.id !== user.userId){
      throw new ForbiddenException();
    }
    if (confirmUser.id !== userId){
      throw new BadBodyException("Invalid user id");
    }
    if (!await compareHash(password, confirmUser.password)){
      throw new BadBodyException("Invalid email or password");
    }
    await this.userRepository.delete({id: userId});
  }
}