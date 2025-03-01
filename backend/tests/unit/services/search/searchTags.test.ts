import { Tag } from '@core/models/Tag';
import { TagRepository } from '@core/repositories/tag/TagRepository';
import { SearchTagsUseCase } from '@core/services/search';
import { SearchTagsInput } from '@core/services/search/searchTags/dto';

describe('Service: test SearchTagsUseCase', () => {
  test('Search tags', async () => {
    const tagEntity = Tag.new({
      name: 'text',
    });

    const inputData = {
      name: 'text',
      pagination: {
        page: 1,
        pageSize: 10,
      },
    } as SearchTagsInput;

    const tagRepositoryMock = {
      getMany: jest.fn().mockReturnValue(Promise.resolve({
        data: [{ entity: tagEntity }],
      })),
    } as Partial<TagRepository>;

    const searchTagUseCase = new SearchTagsUseCase(
      tagRepositoryMock as TagRepository,
    );

    const { data } = await searchTagUseCase.execute(inputData);
    expect(data.at(0)?.entity).toEqual(tagEntity);
    expect(tagRepositoryMock.getMany).toHaveBeenCalled();
  });

  test('Search tags with empty return', async () => {
    const tagRepositoryMock = {
      getMany: async () => ({
        data: [],
        pagination: {
          nextElems: 0,
          page: 0,
          pageSize: 0,
          prevElems: 0,
          totalAmount: 0,
          totalPages: 0,
        },
      }),
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