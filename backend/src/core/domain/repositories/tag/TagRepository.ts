import { TagsRepositoryOutput } from './output/TagRepositoryOutput';
import { TagRepositoryInput } from './input/TagRepositoryInput';

export interface TagRepository {
  findById<Select extends TagRepositoryInput.TagSelect>
    (payload: TagRepositoryInput.FindById<Select>): Promise<TagsRepositoryOutput.FindById>;

  findOne<Select extends TagRepositoryInput.TagSelect>
    (payload: TagRepositoryInput.FindOne<Select>): Promise<TagsRepositoryOutput.FindOne>;

  findMany<Select extends TagRepositoryInput.TagSelect>
    (payload: TagRepositoryInput.FindMany<Select>): Promise<TagsRepositoryOutput.FindMany>;

  paginate<Select extends TagRepositoryInput.TagSelect>
    (payload: TagRepositoryInput.Paginate<Select>): Promise<TagsRepositoryOutput.Paginate>;

  count(payload: TagRepositoryInput.Count): Promise<TagsRepositoryOutput.Count>;
  create(payload: TagRepositoryInput.Create): Promise<TagsRepositoryOutput.Create>;
  createMany(payload: TagRepositoryInput.CreateMany): Promise<TagsRepositoryOutput.CreateMany>;
  createOrFindMany(payload: TagRepositoryInput.CreateOrFindMany): Promise<TagsRepositoryOutput.CreateOrFindMany>;
  update(payload: TagRepositoryInput.Update): Promise<TagsRepositoryOutput.Update>;
  delete(payload: TagRepositoryInput.Delete): Promise<TagsRepositoryOutput.Delete>;
  deleteMany(payload: TagRepositoryInput.DeleteMany): Promise<TagsRepositoryOutput.DeleteMany>;
}