import { SearchQuestionFilterByEnum } from '@cloneoverflow/common';
import { QuestionWhere } from '@core/domain/repositories/question/dtos/Params';

export class QuestionSearchFilters {
  text?: string; 
  tags?: string[]; 
  authors?: string[]; 
  keywords?: string[];
}

export const SearchQuestionsFilterBy = (
  { text, tags, authors, keywords }: QuestionSearchFilters, 
  filterBy?: SearchQuestionFilterByEnum | SearchQuestionFilterByEnum[],
): QuestionWhere => {
  const where: QuestionWhere = {
    OR: authors ? [
      {
        owner: {
          name: { in: authors },
        },
      },
      {
        owner: {
          username: { in: authors },
        },
      },
    ] : undefined,
    
    tags: tags ? {
      name: {
        in: tags,
      },
    } : undefined,
  };

  const filterAND: QuestionWhere['AND'] = [{
    OR: [
      { title: { contains: text ?? '' } },
      { text: { contains: text ?? '' } },
    ],
  }];

  keywords?.forEach((keyword) => { 
    filterAND.push({
      text: { 
        contains: keyword,
      },
    });
  });

  if (filterBy && !Array.isArray(filterBy)) {
    filterBy = [filterBy];
  } 

  const filterMapper: Record<SearchQuestionFilterByEnum, QuestionWhere> = {
    active: {
      isClosed: false,
    },
    closed: {
      isClosed: true,
    },
    monthly: {
      createdAt: {
        geq: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
    weekly: {
      createdAt: {
        geq: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
  };

  for (const filter of filterBy ?? []) {
    filterAND.push(filterMapper[filter]);
  };

  where.AND = filterAND;
  
  return where;
};