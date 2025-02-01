import { TagsRepositoryOutput } from './dtos/TagRepositoryOutput';
import { TagRepositoryInput } from './dtos/TagRepositoryInput';

export interface TagRepository {
  getTag(payload: TagRepositoryInput.GetTag): Promise<TagsRepositoryOutput.GetTag>;
  getMany(payload: TagRepositoryInput.GetMany): Promise<TagsRepositoryOutput.GetMany>;
  isExist(payload: TagRepositoryInput.IsExist): Promise<TagsRepositoryOutput.IsExist>;
  
  create(payload: TagRepositoryInput.Create): Promise<TagsRepositoryOutput.Create>;
  createMany(payload: TagRepositoryInput.CreateMany): Promise<TagsRepositoryOutput.CreateMany>;
  createOrFindMany(payload: TagRepositoryInput.CreateOrFindMany): Promise<TagsRepositoryOutput.CreateOrFindMany>;
  
  update(payload: TagRepositoryInput.Update): Promise<TagsRepositoryOutput.Update>;
  delete(payload: TagRepositoryInput.Delete): Promise<TagsRepositoryOutput.Delete>;
}