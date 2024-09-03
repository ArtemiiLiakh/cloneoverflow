import { AnswerRepository } from '@/repositories/answer.repository';
import { QuestionRepository } from '@/repositories/question.repository';
import { UserRepository } from '@/repositories/user.repository';
import { DbGetAllQuestions, DbQuestion, QuestionUserAnswerRelation, QuestionUserRelation } from '@/types/database/DbQuestion';
import { QuestionSearchFilters } from '@/types/QuestionSearchFilters';
import { ArrayOrUndefinded } from '@/utils/arrayUtils';
import { DbUtils } from '@/utils/DatabaseUtils';
import {
  ForbiddenException,
  NoEntityWithIdException,
  OrderBy,
  QuestionAnswersSortBy,
  QuestionCreateDTO,
  QuestionGetDTO,
  QuestionUpdateDTO,
  SearchQuestionFilterBy,
  SearchQuestionsDTO,
  SearchQuestionSortBy,
  VoteType,
} from '@cloneoverflow/common';
import { Prisma, PrismaClient, QuestionStatus, UserAnswerStatus, UserQuestionStatus } from '@prisma/client';

export class QuestionService {
  constructor(
    private userRepository: UserRepository,
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
    private prisma: PrismaClient,
  ) {}

  async create(userId: string, {title, text, tags}: QuestionCreateDTO) {
    return await this.questionRepository.create({
      ownerId: userId,
      title: title,
      text: text,
      rate: 0,
      status: QuestionStatus.ACTIVE,
      tags: {
        connectOrCreate: tags.map((tag) => {
          return {
            where: { name: tag },
            create: { name: tag },
          };
        }),
      },
      userQuestions: {
        create: {
          userId,
          status: UserQuestionStatus.OWNER,
        },
      },
    });
  }

  async update(questionId: string, userId: string, { title, text, status, tags }: QuestionUpdateDTO) {
    const question = await this.getQuestionWithOwner(questionId);

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }

    if(question.ownerId !== userId){
      throw new ForbiddenException('You are not owner of this question');
    }

    let updateData: any = {
      title: title,
      text: text,
      status: status
    };

    if (tags !== undefined) {
      await this.questionRepository.updateById(questionId, {
        tags: {
          disconnect: question.tags,
        },
      });
      updateData.tags = {
        connectOrCreate: tags.map((tag) => {
          return {
            where: { name: tag },
            create: { name: tag },
          };
        }),
      };
    }

    return await this.questionRepository.updateById(questionId, updateData);
  }

  async get(questionId: string, { answers }: QuestionGetDTO, userId: string) {
    interface QuestionAnswersSortMapper {
      [key: string]: Prisma.AnswerOrderByWithRelationInput;
    }
    
    const sortByAnswers: QuestionAnswersSortMapper = {
      [QuestionAnswersSortBy.RATE]: {
        rate: answers?.orderBy ?? OrderBy.DESC,
      },
      [QuestionAnswersSortBy.DATE]: {
        createdAt: answers?.orderBy ?? OrderBy.DESC,
      },
    };

    const question = await this.questionRepository.findById<DbQuestion & QuestionUserAnswerRelation & QuestionUserRelation>(questionId, {
      include: {
        userQuestions: {
          where: {
            userId,
            status: UserQuestionStatus.VOTER,
          },
          include: {
            userProfile: true,
          }
        },
        owner: true,
        tags: true,
        answers: {
          include: {
            userAnswers: {
              where: {
                userId,
                status: UserAnswerStatus.VOTER,
              },
              include: {
                userProfile: true,
              },
            },
            owner: true,
          },
          orderBy: sortByAnswers[answers?.sortBy ?? QuestionAnswersSortBy.DATE],
        },
      }
    });
    
    if (!question) {
      throw new NoEntityWithIdException('Question');
    }

    if (!userId) {
      return question;
    }

    const viewedQuestion = await this.questionRepository.find({
      id: questionId,
      userQuestions: {
        some: {
          userId,
          status: UserQuestionStatus.VIEWER,
        },
      },
    });

    if (!viewedQuestion) {
      await this.questionRepository.updateById(questionId, {
        views: {
          increment: 1,
        },
        userQuestions: {
          create: {
            userId,
            status: UserQuestionStatus.VIEWER,
          },
        }
      });
    }
    
    return question;
  }

  async delete(questionId: string, userId: string) {
    const question = await this.getQuestionWithOwner(questionId);

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }

    if (question.ownerId !== userId) {
      throw new ForbiddenException('You are not owner of this question');
    }

    await this.questionRepository.delete({
      id: questionId,
    });

    return question;
  }

  getAll({ search, pagination, orderBy, sortBy, filterBy }: SearchQuestionsDTO) {
    const searchFilter = this.parseSearch(search);
    const where = this.getQuestionsFilterBy(searchFilter, filterBy);
  
    return DbUtils.paginate<Prisma.QuestionFindManyArgs, DbGetAllQuestions>(this.questionRepository, {
      where,
      include: {
        _count: {
          select: {
            answers: true,
          },
        },
        tags: true,
        owner: true,
      },
      orderBy: this.getQuestionsSortBy(sortBy, orderBy),
    }, pagination);
  }

  private parseSearch(search?: string) {
    if (!search) return {};
  
    const searchText = new RegExp(/(.*?\?)|(.*)/, 'i').exec(search)?.[0];
    let text = searchText?.at(-1) === '?' ? searchText.slice(0, -1) : searchText;
    text = text?.replace(/(^\s+) | (\s+$)/g, '');

    const filters = search
      .replace(searchText ?? '', '')
      .match(/([\#\:]\w+)|(\".*\")/g)

    if (!filters) return { text };
  
    let tags = ArrayOrUndefinded(filters.filter((filter) => filter.includes('#')));
    let authors = ArrayOrUndefinded(filters.filter((filter) => filter.includes(':')));
    let keywords = ArrayOrUndefinded(filters.filter((filter) => filter.includes('"'))); 
    
    tags = tags?.map((tag) => tag.replace('#', ''));
    authors = authors?.map((author) => author.replace(':', ''));
    keywords = keywords?.map((keyword) => keyword.replace(/"/g, ''));
  
    return {
      text,
      tags,
      authors,
      keywords
    };
  }

  private getQuestionsSortBy(sortBy?: SearchQuestionSortBy | SearchQuestionSortBy[], orderBy?: OrderBy): Prisma.QuestionOrderByWithRelationInput[] {
    interface SearchSortByMapper {
      [key: string]: Prisma.QuestionOrderByWithRelationInput;
    }
    
    const searchSortByMapper: SearchSortByMapper = {
      [SearchQuestionSortBy.RATE]: {
        rate: orderBy ?? OrderBy.DESC,
      },
      [SearchQuestionSortBy.DATE]: {
        createdAt: orderBy ?? OrderBy.DESC,
      },
      [SearchQuestionSortBy.ANSWERS]: {
        answers: {
          _count: orderBy ?? OrderBy.DESC,
        }
      },
      [SearchQuestionSortBy.STATUS]: {
        status: orderBy ?? OrderBy.DESC,
      },
      [SearchQuestionSortBy.VIEWS]: {
        views: orderBy ?? OrderBy.DESC,
      },
    };

    let sortByRes: Prisma.QuestionOrderByWithRelationInput[] = [];

    if (sortBy && !Array.isArray(sortBy)) {
      sortBy = [sortBy];
    } 

    for (const sort of sortBy ?? []) {
      sortByRes.push(searchSortByMapper[sort]);
    };

    return sortByRes;
  }

  private getQuestionsFilterBy ({ text, tags, authors, keywords }: QuestionSearchFilters, filterBy?: SearchQuestionFilterBy[]): Prisma.QuestionWhereInput {
    const textFilter = keywords?.map((keyword) => ({ text: { contains: keyword, mode: "insensitive" } })) || [{}];
    const filterAND = [
      {
        OR: [
          { title: { contains: text ?? '', mode: "insensitive" } },
          { text: { contains: text ?? '', mode: "insensitive" } },
        ],
      },
      ...textFilter,
    ];

    let where: Prisma.QuestionWhereInput = {
      userQuestions: {
        some: {
          status: UserQuestionStatus.OWNER,
          userProfile: authors ? {
            OR: [
              {
                name: {
                  in: authors,
                  mode: "insensitive",
                },
              },
              {
                username: {
                  in: authors,
                  mode: "insensitive",
                },
              },
            ]
          } : undefined,
        },
      },
      tags: tags ? {
        some: {
          name: {
            in: tags,
          },
        },
      } : undefined,
    };

    if (filterBy && !Array.isArray(filterBy)) {
      filterBy = [filterBy];
    } 

    for (const filter of filterBy ?? []) {
      if (filter === SearchQuestionFilterBy.CLOSED) {
        filterAND.push({
          status: QuestionStatus.CLOSED,
        });
      }
      else if (filter === SearchQuestionFilterBy.ACTIVE) {
        filterAND.push({
          status: QuestionStatus.ACTIVE,
        });
      }
      else if (filter === SearchQuestionFilterBy.WEEKLY) {
        filterAND.push({
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        });
      }
      else if (filter === SearchQuestionFilterBy.MONTHLY) {
        filterAND.push({
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        });
      }
    };

    where.AND = filterAND;
    
    return where;
  }

  async closeQuestion (questionId: string, answerId: string, userId: string) {
    const question = await this.getQuestionWithOwner(questionId);

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }

    const answer = await this.answerRepository.findById(answerId);

    if (question.ownerId !== userId) {
      throw new ForbiddenException();
    }

    return this.questionRepository.updateById(questionId, {
      status: !answer.isSolution ? QuestionStatus.CLOSED : QuestionStatus.ACTIVE,
      answers: {
        update: {
          where: {
            id: answerId,
          },
          data: {
            isSolution: !answer.isSolution,
          },
        },
        updateMany: {
          where: {
            id: {
              not: answerId,
            },
            questionId,
          },
          data: {
            isSolution: false,
          },
        },
      },
    });
  }

  async voteQuestion (questionId: string, userId: string, vote: VoteType) {
    const votedQuestion = await this.questionRepository.findById<DbQuestion & QuestionUserRelation>(questionId, {
      include: {
        userQuestions: {
          where: {
            userId,
            questionId,
            status: UserQuestionStatus.VOTER,
          },
          include: {
            userProfile: true,
          },
        },
      }
    });
    
    if (!votedQuestion) {
      throw new NoEntityWithIdException('Question');
    }

    if (votedQuestion.ownerId === userId) {
      throw new ForbiddenException('You cannot vote your own question');
    }

    if (!votedQuestion.userQuestions[0]) {
      return this.prisma.$transaction([
        this.questionRepository.updateById(questionId, {
          rate: {
            increment: vote === VoteType.UP ? 1 : -1,
          },
          userQuestions: {
            create: {
              userId,
              voteType: vote,
              status: UserQuestionStatus.VOTER
            },
          },
        }),
        this.userRepository.updateById(votedQuestion.ownerId, {
          userProfile: {
            update: {
              reputation: {
                increment: vote === VoteType.UP ? 1 : -1,
              },
            }
          },
        }),
      ]);
    }

    if (votedQuestion.userQuestions[0].voteType !== vote) {
      return this.prisma.$transaction([
        this.userRepository.updateById(votedQuestion.ownerId, {
          userProfile: {
            update: {
              reputation: {
                increment: vote === VoteType.UP ? 1 : -1
              },
            }
          }
        }),
        this.questionRepository.updateById(questionId, {
          rate: {
            increment: vote === VoteType.UP ? 1 : -1,
          },
          userQuestions: {
            update: {
              where: {
                id: votedQuestion.userQuestions[0].id,
              },
              data: {
                voteType: votedQuestion.userQuestions[0].voteType ? null : vote,
              },
            },
          },
        }),
      ], {
        isolationLevel: 'ReadUncommitted',
      });
    }

    throw new ForbiddenException();
  }

  private getQuestionWithOwner (questionId: string) {
    return this.questionRepository.find({
      id: questionId,
      userQuestions: {
        some: {
          status: UserQuestionStatus.OWNER,
        },
      },
    });
  }
}