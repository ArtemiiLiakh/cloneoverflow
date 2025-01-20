const ArrayOrUndefinded = <T>(array: T[]) => {
  return array.length > 0 ? array : undefined;
};

export const SearchQuestionParse = (search?: string) => {
  if (!search) return {};

  const searchText = new RegExp(/(.*?\?)|(.*)/, 'i').exec(search)?.[0];
  let text = searchText?.at(-1) === '?' ? searchText.slice(0, -1) : searchText;
  text = text?.replace(/(^\s+) | (\s+$)/g, '');

  const filters = search
    .replace(searchText ?? '', '')
    .match(/([#@]\w+)|(".*")/g);

  if (!filters) return { text };

  let tags = ArrayOrUndefinded(filters.filter((filter) => filter.includes('#')));
  let authors = ArrayOrUndefinded(filters.filter((filter) => filter.includes('@')));
  let keywords = ArrayOrUndefinded(filters.filter((filter) => filter.includes('"'))); 
  
  tags = tags?.map((tag) => tag.replace('#', ''));
  authors = authors?.map((author) => author.replace('@', ''));
  keywords = keywords?.map((keyword) => keyword.replace(/"/g, ''));

  return {
    text,
    tags,
    authors,
    keywords,
  };
};