import { Tag } from '@core/domain/entities/Tag';

describe('Entity: test Tag entity', () => {
  test('Create Tag entity with default fields', () => {
    const tag = Tag.new({
      name: 'tag',
    });

    expect(tag.id).toEqual('');
    expect(tag.name).toEqual('tag');
  });

  test('Create Tag entity with custom fields', () => {
    const payload: Tag = {
      id: 'id',
      name: 'text',
    };

    const user = Tag.new(payload);

    expect(user).toEqual(payload);
  });
});