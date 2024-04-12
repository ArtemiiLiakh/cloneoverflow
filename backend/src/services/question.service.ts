import {
  ForbiddenException,
  OrderBy,
  QuestionCreateDTO,
  QuestionFilterBy,
  QuestionGAQSortBy,
  QuestionGetAllDTO,
  QuestionUpdateDTO
} from '@cloneoverflow/common';
import { Prisma, QuestionStatus } from '@prisma/client';
import { QuestionRepository } from "../repositories/question.repository";
import { QuestionSearchFilters } from '../types/QuestionSearchFilters';
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

  getAll({ search, pagination, orderBy, sortBy, filterBy }: QuestionGetAllDTO) {
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
        userProfile: true,
      },
      orderBy: this.getQuestionsSortBy(sortBy, orderBy),
    }, pagination);
  }

  private parseSearch(search?: string): QuestionSearchFilters {
    if (!search) return {};
  
    const searchReg = new RegExp(/(.*\$)|(.*)/, 'i').exec(search)?.[0];
    const text = searchReg?.at(-1) === '$' ? searchReg.slice(0, -1) : searchReg;
  
    const filters = search
      .replace(searchReg ?? '', '')
      .match(/\[(.*?)\]/g)
      ?.map((filter) => filter.slice(1, -1));
    if (!filters) return { text };
  
    let tags = filters.filter((filter) => filter.includes('#'));
    let authors = filters.filter((filter) => filter.includes(':'));
    let keywords = filters.filter((filter) => filter.includes('"')); 
    
    tags = tags.map((tag) => tag.replace('#', ''));
    authors = authors.map((author) => author.replace(':', ''));
    keywords = keywords.map((keyword) => keyword.replace(/"/g, ''));
  
    return {
      text,
      tags,
      authors,
      keywords
    };
  }

  private getQuestionsSortBy(sortBy?: QuestionGAQSortBy, orderBy?: OrderBy): Prisma.QuestionOrderByWithRelationInput {
    switch (sortBy) {
      case QuestionGAQSortBy.RATE:
        return {
          rate: orderBy ?? 'desc',
        };
      case QuestionGAQSortBy.DATE:
        return {
          createdAt: orderBy ?? 'desc',
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

  private getQuestionsFilterBy ({ text, tags, authors, keywords }: QuestionSearchFilters, filterBy?: QuestionFilterBy): Prisma.QuestionWhereInput {
    const textFilter = keywords?.map((keyword) => ({ text: { contains: keyword, mode: "insensitive" } })) || [{}];
    
    let where: Prisma.QuestionWhereInput = {
      AND: [
        { text: { contains: text ?? '', mode: "insensitive" } },
        ...textFilter,
      ],
      userProfile: {
        name: {
          in: authors,
        },
      },
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