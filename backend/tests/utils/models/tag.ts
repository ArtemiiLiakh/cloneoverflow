import { Tag } from '@core/models/tag';

export const createTag = (params?: Partial<Tag>): Tag => {
  return Tag.new({
    id: params?.id ?? 'id',
    name: params?.name ?? 'name',
  });
}