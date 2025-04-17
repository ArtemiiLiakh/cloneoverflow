import { QuestionRepoSearchWhereProps } from '@core/repositories/question/dtos/Search';

const ArrayOrUndefinded = <T>(array: T[]): T[] | undefined => {
  return array.length > 0 ? array : undefined;
};

export const SearchQuestionParse = (search?: string): QuestionRepoSearchWhereProps => {
  if (!search) return {};

  const searchExpression = new RegExp(/(.*?\?)|(.*)/, 'i').exec(search)?.[0];
  let searchText = searchExpression?.at(-1) === '?' ? searchExpression.slice(0, -1) : searchExpression;
  searchText = searchText?.replace(/(^\s+) | (\s+$)/g, '');

  const filters = search
    .replace(searchText ?? '', '')
    .match(/([#@]\w+)|(".*")/g);

  if (!filters) return { searchText };

  let tags = ArrayOrUndefinded(filters.filter((filter) => filter.includes('#')));
  let authors = ArrayOrUndefinded(filters.filter((filter) => filter.includes('@')));
  let keywords = ArrayOrUndefinded(filters.filter((filter) => filter.includes('"'))); 
  
  tags = tags?.map((tag) => tag.replace('#', ''));
  authors = authors?.map((author) => author.replace('@', ''));
  keywords = keywords?.map((keyword) => keyword.replace(/"/g, ''));

  return {
    searchText,
    tags,
    authors,
    keywords,
  };
};