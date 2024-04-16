import {
  ForbiddenException,
  OrderBy,
  QuestionCreateDTO,
  SearchQuestionSortBy,
  SearchQuestionFilterBy,
  SearchQuestionsDTO,
  QuestionUpdateDTO
} from '@cloneoverflow/common';
import { Prisma, QuestionStatus } from '@prisma/client';
import { QuestionRepository } from "../repositories/question.repository";
import { QuestionSearchFilters } from '../types/QuestionSearchFilters';
import { DbGetAllQuestions } from '../types/database/DbQuestion';
import { DbUtils } from '../utils/DatabaseUtils';
import { ArrayOrUndefinded } from '../utils/arrayUtils';

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
        userProfile: true,
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
    let sortByRes: Prisma.QuestionOrderByWithRelationInput[] = [];

    for (const sort of sortBy ?? []) {
      if (sort === SearchQuestionSortBy.RATE) {
        sortByRes.push({
          rate: orderBy ?? 'desc',
        });
      }
      else if (sort === SearchQuestionSortBy.DATE) {
        sortByRes.push({
          createdAt: orderBy ?? 'desc',
        });
      }
      else if (sort === SearchQuestionSortBy.ANSWERS) {
        sortByRes.push({
          answers: {
            _count: orderBy ?? 'desc',
          },
        });
      }
      else if (sort === SearchQuestionSortBy.STATUS) {
        sortByRes.push({
          status: orderBy ?? 'desc',
        });
      }
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
      userProfile: {
        name: {
          in: authors,
          mode: "insensitive",
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
}