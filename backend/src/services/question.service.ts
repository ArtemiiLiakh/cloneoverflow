import {
  ForbiddenException,
  OrderBy,
  QuestionCreateDTO,
  SearchQuestionSortBy,
  SearchQuestionFilterBy,
  SearchQuestionsDTO,
  QuestionUpdateDTO,
  NoEntityWithIdException,
  QuestionGetDTO,
  QuestionAnswersSortBy,
  VoteType,
} from '@cloneoverflow/common';
import { Prisma, PrismaClient, QuestionStatus, UserAnswerStatus, UserQuestionStatus } from '@prisma/client';
import { DbUtils } from '../utils/DatabaseUtils';
import { ArrayOrUndefinded } from '../utils/arrayUtils';
import { AnswerRepository } from '../repositories/answer.repository';
import { QuestionRepository } from '../repositories/question.repository';
import { QuestionSearchFilters } from '../types/QuestionSearchFilters';
import { DbGetAllQuestions } from '../types/database/DbQuestion';

export class QuestionService {
  constructor(
    private questionRepository = new QuestionRepository(),
    private answerRepository = new AnswerRepository(),
    private prisma = new PrismaClient(),
  ) {}

  async create(userId: string, {title, text, tags}: QuestionCreateDTO) {
    return await this.questionRepository.create({
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
    const existingQuestion = await this.questionRepository.find({
      id: questionId,
      text: {
        mode: 'insensitive'
      },
      userQuestions: {
        some: {
          userId,
        },
      },
    });

    if(existingQuestion?.userQuestions[0].userId !== userId){
      throw new ForbiddenException();
    }

    let updateData: any = {
      title: title,
      text: text,
      status: status
    };

    if (tags !== undefined) {
      await this.questionRepository.updateById(questionId, {
        tags: {
          disconnect: existingQuestion.tags,
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


    return await this.questionRepository.updateById(questionId, updateData,);
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

    const question = await this.questionRepository.findById(questionId, {
      include: {
        userQuestions: {
          where: {
            OR: [
              {
                status: UserQuestionStatus.OWNER,
              },
              {
                userId,
                status: UserQuestionStatus.VOTER,
              }
            ],
          },
          include: {
            userProfile: true,
          }
        },
        tags: true,
        answers: {
          include: {
            userAnswers: {
              where: {
                OR: [
                  {
                    status: UserAnswerStatus.OWNER,
                  },
                  {
                    userId,
                    status: UserAnswerStatus.VOTER,
                  }
                ],
              },
              include: {
                userProfile: true,
              },
            }
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

  async delete(questionId: string) {
    const question = await this.questionRepository.delete({
      id: questionId,
    });

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }

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
        userQuestions: {
          where: {
            status: UserQuestionStatus.OWNER,
          },
          include: {
            userProfile: true
          },
        },
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

  private getQuestionsSortBy(sortBy?: SearchQuestionSortBy[], orderBy?: OrderBy): Prisma.QuestionOrderByWithRelationInput[] {
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
    const answer = await this.answerRepository.findById(answerId);

    if (question.userQuestions[0].userId !== userId) {
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
    const votedQuestion = await this.questionRepository.find({
      id: questionId,
    }, {
      include: {
        userQuestions: {
          where: {
            OR: [
              {
                userId,
                questionId,
                status: UserQuestionStatus.OWNER,
              }, 
              {
                userId,
                questionId,
                status: UserQuestionStatus.VOTER,
              },
            ],
          },
        },
      }
    });
    
    const { userQuestions: ownerQuestions } = await this.getQuestionWithOwner(questionId);
    
    if (!votedQuestion.userQuestions[0]) {
      return this.questionRepository.updateById(questionId, {
        rate: {
          increment: vote === VoteType.UP ? 1 : -1,
        },
        userQuestions: {
          create: {
            userId,
            voteType: vote,
            status: UserQuestionStatus.VOTER,
          },
          update: {
            where: {
              id: ownerQuestions[0].id,
            },
            data: {
              userProfile: {
                update: {
                    reputation: {
                      increment: vote === VoteType.UP ? 1 : -1,
                    },
                  },
                },
              },
            },
          },
      });
    }

    if (
      votedQuestion.userQuestions[0].status === UserQuestionStatus.VOTER && 
      votedQuestion.userQuestions[0].voteType !== vote
    ) {
      return this.prisma.$transaction([
        this.questionRepository.updateById(questionId, {
          userQuestions: {
            update: {
              where: {
                id: ownerQuestions[0].id,
              },
              data: {
                userProfile: {
                  update: {
                    reputation: {
                      increment: vote === VoteType.UP ? 1 : -1
                    },
                  },
                },
              },
            },
          },
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