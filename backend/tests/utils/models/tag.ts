import { Tag } from '@core/tag';

export const createTag = (params?: Partial<Tag>): Tag => {
  return Tag.new({
    id: params?.id ?? 'id',
    name: params?.name ?? 'name',
  });
}