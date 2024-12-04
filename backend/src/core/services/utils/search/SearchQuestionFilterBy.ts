import { SearchQuestionFilterByEnum } from '@cloneoverflow/common';
import { QuestionRepositoryInput } from '@core/domain/repositories/question/input/QuestionRepositoryInput';

export class QuestionSearchFilters {
  text?: string; 
  tags?: string[]; 
  authors?: string[]; 
  keywords?: string[];
}

export const SearchQuestionsFilterBy = (
  { text, tags, authors, keywords }: QuestionSearchFilters, 
  filterBy?: SearchQuestionFilterByEnum | SearchQuestionFilterByEnum[],
): QuestionRepositoryInput.QuestionWhere => {
  const where: QuestionRepositoryInput.QuestionWhere = {
    owner: authors ? {
      OR: [
        {
          name: {
            in: authors,
          },
        },
        {
          username: {
            in: authors,
          },
        },
      ],
    } : undefined,
    
    tags: tags ? {
      text: {
        in: tags,
      },
    } : undefined,
  };

  const filterAND: QuestionRepositoryInput.QuestionWhere['AND'] = [{
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

  const filterMapper: Record<SearchQuestionFilterByEnum, QuestionRepositoryInput.QuestionWhere> = {
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