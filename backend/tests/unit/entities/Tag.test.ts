import { Tag } from '@core/domain/entities/Tag';
import { isUUID } from 'class-validator';

describe('Entity: test Tag entity', () => {
  test('Create Tag entity with default fields', () => {
    const tag = Tag.new({
      name: 'tag',
    });

    expect(isUUID(tag.id)).toBeTruthy();
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