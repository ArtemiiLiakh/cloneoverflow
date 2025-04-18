import { SearchQuestionFilterByEnum } from '@cloneoverflow/common';
import { QuestionRepoSearchWhereProps } from '@core/repositories/question/dtos/Search';

export const SearchQuestionFilterMapper = (
  filterBy: SearchQuestionFilterByEnum,
  userId?: string,
): QuestionRepoSearchWhereProps => {
  const filterMapper: Record<SearchQuestionFilterByEnum, QuestionRepoSearchWhereProps> = {
    active: {
      isClosed: false,
    },
    closed: {
      isClosed: true,
    },
    monthly: {
      createdAt: {
        gt: new Date(Date.now()-30*24*60*60*1000),
      },
    },
    weekly: {
      createdAt: {
        gt: new Date(Date.now()-7*24*60*60*1000),
      },
    },
    favorite: {
      favorite: {
        userId: userId!,
      },
    },
  };

  return filterMapper[filterBy];
};