import { Tag } from '@core/models/tag/Tag';

describe('Entity: test Tag entity', () => {
  test('Create Tag entity with fullfiled fields', () => {
    const tag = Tag.new({
      id: 'id',
      name: 'tag',
    });

    expect(tag.id).toEqual('id');
    expect(tag.name).toEqual('tag');
  });
});