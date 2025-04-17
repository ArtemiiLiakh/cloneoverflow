import { TagRepoSearchOutput } from '@core/repositories/tag/dtos/Search';
import { TagRepository } from '@core/repositories/tag/TagRepository';
import { SearchTagsUseCase } from '@core/services/search';
import { SearchTagsInput } from '@core/services/search/searchTags/dto';
import { createTag } from '@tests/utils/models/tag';

describe('Search service: test TagsUseCase', () => {
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
        pagination: {
          nextElems: 0,
          page: 0,
          pageSize: 0,
          prevElems: 0,
          totalAmount: 0,
          totalPages: 0,
        },
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
        pagination: {
          nextElems: 0,
          page: 0,
          pageSize: 0,
          prevElems: 0,
          totalAmount: 0,
          totalPages: 0,
        },
      } as TagRepoSearchOutput),
    } as Partial<TagRepository>;

    const searchTagUseCase = new SearchTagsUseCase(
      tagRepositoryMock as TagRepository,
    );

    const { data, pagination } = await searchTagUseCase.execute({});
    expect(data.length).toEqual(0);
    expect(pagination).toEqual({
      nextElems: 0,
      page: 0,
      pageSize: 0,
      prevElems: 0,
      totalAmount: 0,
      totalPages: 0,
    });
  });
});