import { UseCase } from '@common/services/UseCase';
import { SearchTagsInput, SerachTagsOutput } from './dto';

export interface ISearchTagsUseCase extends UseCase<SearchTagsInput, SerachTagsOutput> {}
