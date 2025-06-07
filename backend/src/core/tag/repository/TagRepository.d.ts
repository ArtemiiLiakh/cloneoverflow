import { TagRepoCreateOrFindManyInput, TagRepoCreateOrFindManyOutput } from './dtos/CreateOrFindMany';
import { TagRepoDeleteInput, TagRepoDeleteOutput } from './dtos/Delete';
import { TagRepoGetByNameInput, TagRepoGetByNameOuput } from './dtos/GetByName';
import { TagRepoGetQuestionTagsInput, TagRepoGetQuestionTagsOutput } from './dtos/GetQuestionTags';
import { TagRepoIsExistInput, TagRepoIsExistOutput } from './dtos/IsExist';
import { TagRepoSearchInput, TagRepoSearchOutput } from './dtos/Search';

export interface TagRepository {
  getByName(payload: TagRepoGetByNameInput): Promise<TagRepoGetByNameOuput>;
  getQuestionTags(payload: TagRepoGetQuestionTagsInput): Promise<TagRepoGetQuestionTagsOutput>;
  search(payload: TagRepoSearchInput): Promise<TagRepoSearchOutput>;
  isExist(payload: TagRepoIsExistInput): Promise<TagRepoIsExistOutput>;
  
  createOrFindMany(payload: TagRepoCreateOrFindManyInput): Promise<TagRepoCreateOrFindManyOutput>;
  delete(payload: TagRepoDeleteInput): Promise<TagRepoDeleteOutput>;
}