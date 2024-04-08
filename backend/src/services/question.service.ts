import { ForbiddenException, OrderBy, QuestionCreateDTO, QuestionFilterBy, QuestionGAQSortBy, QuestionGetAllDTO, QuestionUpdateDTO } from '@clone-overflow/common';
import { Prisma, QuestionStatus } from '@prisma/client';
import { QuestionRepository } from "../repositories/question.repository";
import { DbGetAllQuestions } from '../types/database/DbQuestion';
import { DbUtils } from '../utils/DatabaseUtils';

export class QuestionService {
  constructor(
    private questionRepository = new QuestionRepository(),
  ) {}

  async create(userId: string, {title, text, tags}: QuestionCreateDTO) {
    return await this.questionRepository.create({
      userId: userId,
      title: title,
      text: text,
      rate: 0,
      status: "ACTIVE",
      tags: {
        connectOrCreate: tags.map((tag) => {
          return {
            where: { name: tag },
            create: { name: tag },
          };
        }),
      },
    });
  }

  async update(questionId: string, userId: string, {title, text, status, tags}: QuestionUpdateDTO) {
    const existingQuestion = await this.questionRepository.findById(questionId);

    if(existingQuestion.userId !== userId){
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

    return await this.questionRepository.updateById(questionId, updateData);
  }

  getAll({ search, tags, pagination, orderBy, sortBy, filterBy }: QuestionGetAllDTO) {
    const where = this.getQuestionsFilterBy({
      search,
      tags,
      filterBy,
    });
  
    return DbUtils.paginate<Prisma.QuestionFindManyArgs, DbGetAllQuestions>(this.questionRepository, {
      where,
      include: {
        _count: {
          select: {
            answers: true,
          },
        },
        tags: true,
        userProfile: true,
      },
      orderBy: this.getQuestionsSortBy(sortBy, orderBy),
    }, pagination);
  }

  private getQuestionsSortBy(sortBy?: QuestionGAQSortBy, orderBy?: OrderBy): Prisma.QuestionOrderByWithRelationInput {
    switch (sortBy) {
      case QuestionGAQSortBy.RATE:
        return {
          rate: orderBy ?? 'desc',
        };
      case QuestionGAQSortBy.DATE:
        return {
          createdAt: orderBy ?? 'asc',
        };
      case QuestionGAQSortBy.ANSWERS:
        return {
          answers: {
            _count: orderBy ?? 'desc',
          },
        };
      case QuestionGAQSortBy.STATUS:
        return {
          status: orderBy ?? 'desc',
        };
    }

    return {};
  }

  private getQuestionsFilterBy ({ search, tags, filterBy }: QuestionGetAllDTO): Prisma.QuestionWhereInput {
    let where: Prisma.QuestionWhereInput = {
      OR: [
        { title: { contains: search ?? '', mode: "insensitive" } },
        { text: { contains: search ?? '', mode: "insensitive" } },
      ],
      tags: {
        some: {
          name: {
            in: tags,
          },
        },
      },
    };

    switch (filterBy) {
      case QuestionFilterBy.ANSWERED:
        where = {
          status: QuestionStatus.CLOSED,
        };
        break;
      case QuestionFilterBy.WEEKLY:
        where = {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        };
        break;
      case QuestionFilterBy.MONTHLY:
        where = {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        };
        break;
    }
    
    return where;
  }
}