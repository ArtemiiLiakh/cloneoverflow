import { TagsRepositoryOutput } from "./output/TagRepositoryOutput";
import { TagRepositoryInput } from "./input/TagRepositoryInput";

export interface TagRepository {
  findById(payload: TagRepositoryInput.FindById): Promise<TagsRepositoryOutput.FindById>;
  findOne(payload: TagRepositoryInput.FindOne): Promise<TagsRepositoryOutput.FindOne>;
  findMany(payload: TagRepositoryInput.FindMany): Promise<TagsRepositoryOutput.FindMany>;
  paginate(payload: TagRepositoryInput.Paginate): Promise<TagsRepositoryOutput.Paginate>
  count(payload: TagRepositoryInput.Count): Promise<TagsRepositoryOutput.Count>;
  create(payload: TagRepositoryInput.Create): Promise<TagsRepositoryOutput.Create>;
  createMany(payload: TagRepositoryInput.CreateMany): Promise<TagsRepositoryOutput.CreateMany>;
  createOrFindMany(payload: TagRepositoryInput.CreateOrFindMany): Promise<TagsRepositoryOutput.CreateOrFindMany>;
  update(payload: TagRepositoryInput.Update): Promise<TagsRepositoryOutput.Update>;
  delete(payload: TagRepositoryInput.Delete): Promise<TagsRepositoryOutput.Delete>;
  deleteMany(payload: TagRepositoryInput.DeleteMany): Promise<TagsRepositoryOutput.DeleteMany>;
}