import { SearchTagsUseCase } from '@application/search/usercases';
import { SearchTagsInput } from '@application/search/usercases/dtos';
import { PaginationInfo } from '@cloneoverflow/common';
import { TagRepoSearchOutput } from '@core/tag/repository/dtos/Search';
import { TagRepository } from '@core/tag/repository/TagRepository';
import { createTag } from '@tests/utils/models/tag';

describe('Search service: test TagsUseCase', () => {
  const paginationInfo: PaginationInfo = {
    page: 0,
    pageSize: 0,
    totalAmount: 0,
    totalPages: 0,
    hasNext: false,
  };
  
  test('Search tags', async () => {
    const tagEntity = createTag();

    const inputData = {
      name: 'text',
      pagination: {
        page: 1,
        pageSize: 10,
      },
    } as SearchTagsInput;

    const tagRepositoryMock = {
      search: jest.fn().mockResolvedValue({
        data: [{ 
          tag: tagEntity, 
          questionAmount: 0,
        }],
        pagination: paginationInfo,
      } as TagRepoSearchOutput),
    } as Partial<TagRepository>;

    const searchTagUseCase = new SearchTagsUseCase(
      tagRepositoryMock as TagRepository,
    );

    const { data } = await searchTagUseCase.execute(inputData);
    expect(data.at(0)?.tag).toEqual(tagEntity);
    expect(tagRepositoryMock.search).toHaveBeenCalled();
  });

  test('Search tags with empty return', async () => {
    const tagRepositoryMock = {
      search: async () => ({
        data: [],
        pagination: paginationInfo,
      } as TagRepoSearchOutput),
    } as Partial<TagRepository>;

    const searchTagUseCase = new SearchTagsUseCase(
      tagRepositoryMock as TagRepository,
    );

    const { data, pagination } = await searchTagUseCase.execute({});
    expect(data.length).toEqual(0);
    expect(pagination).toEqual({
      page: 0,
      pageSize: 0,
      totalAmount: 0,
      totalPages: 0,
      hasNext: false,
    });
  });
});