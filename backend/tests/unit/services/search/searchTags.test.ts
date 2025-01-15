import { OrderByEnum } from '@cloneoverflow/common';
import { StringOptions } from '@common/repository/Datatypes/StringType';
import { Tag } from '@core/domain/entities/Tag';
import { TagOrderByType } from '@core/domain/repositories/tag/dtos/Params';
import { TagRepository } from '@core/domain/repositories/tag/TagRepository';
import { SearchServiceInput } from '@core/services/search/dtos/SearchServiceInput';
import { SearchTagsUseCase } from '@core/services/search/usecases/searchTags';

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
    } as SearchServiceInput.SearchTags;

    const tagRepositoryMock = {
      getMany: async ({ where, orderBy, pagination }) => {
        expect((where.text as StringOptions).contains).toEqual(inputData.name);
        expect((orderBy as TagOrderByType).questionsAmount).toEqual(OrderByEnum.DESC);
        expect(pagination?.page).toEqual(inputData.pagination?.page);
        expect(pagination?.pageSize).toEqual(inputData.pagination?.pageSize);

        return {
          data: [{ entity: tagEntity }],
          pagination: {
            nextElems: 0,
            page: pagination?.page,
            pageSize: pagination?.pageSize,
            prevElems: 0,
            totalAmount: 0,
            totalPages: 0,
          },
        };
      },
    } as Partial<TagRepository>;

    const searchTagUseCase = new SearchTagsUseCase(
      tagRepositoryMock as TagRepository,
    );

    const { data, pagination } = await searchTagUseCase.execute(inputData);
    expect(data.at(0)?.entity).toEqual(tagEntity);
    expect(pagination).toEqual({
      nextElems: 0,
      page: pagination?.page,
      pageSize: pagination?.pageSize,
      prevElems: 0,
      totalAmount: 0,
      totalPages: 0,
    });
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