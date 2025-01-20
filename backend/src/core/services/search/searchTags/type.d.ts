import { UseCase } from '@common/usecase/UseCase';
import { SearchTagsInput, SerachTagsOutput } from './dto';

export interface ISearchTagsUseCase extends UseCase<SearchTagsInput, SerachTagsOutput> {}
