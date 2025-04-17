import { QuestionRepoAddViewerInput, QuestionRepoAddViewerOutput } from './dtos/AddViewer';
import { QuestionRepoCloseQuestionInput, QuestionRepoCloseQuestionOutput } from './dtos/CloseQuestion';
import { QuestionRepoCreateInput, QuestionRepoCreateOutput } from './dtos/Create';
import { QuestionRepoDeleteInput, QuestionRepoDeleteOutput } from './dtos/Delete';
import { QuestionRepoGetBestOwnerQuestionInput, QuestionRepoGetBestOwnerQuestionOutput } from './dtos/GetBestOwnerQuestion';
import { QuestionRepoGetByIdInput, QuestionRepoGetByIdOutput } from './dtos/GetById';
import { QuestionRepoGetDetailedByIdInput, QuestionRepoGetDetailedByIdOutput } from './dtos/GetDetailedById';
import { QuestionRepoGetOwnerQuestionsInput, QuestionRepoGetOwnerQuestionsOutput } from './dtos/GetOwnerQuestions';
import { QuestionRepoGetViewerInput, QuestionRepoGetViewerOutput } from './dtos/GetViewer';
import { QuestionRepoIsExistsInput, QuestionRepoIsExistsOutput } from './dtos/IsExists';
import { QuestionRepoOpenQuestionInput, QuestionRepoOpenQuestionOutput } from './dtos/OpenQuestion';
import { QuestionRepoRefTagsInput, QuestionRepoRefTagsOutput } from './dtos/RefTags';
import { QuesitonRepoSearchInput, QuestionRepoSearchOutput } from './dtos/Search';
import { QuestionRepoUnrefAllTagsInput, QuestionRepoUnrefAllTagsOutput } from './dtos/UnrefAllTags';
import { QuestionRepoUpdateInput, QuestionRepoUpdateOutput } from './dtos/Update';
import { QuestionRepoVoteDownInput, QuestionRepoVoteDownOutput } from './dtos/VoteDown';
import { QuestionRepoVoteUpInput, QuestionRepoVoteUpOutput } from './dtos/VoteUp';

export interface QuestionRepository {
  getById(payload: QuestionRepoGetByIdInput): Promise<QuestionRepoGetByIdOutput>;
  getDetailedById(payload: QuestionRepoGetDetailedByIdInput): Promise<QuestionRepoGetDetailedByIdOutput>;
  getBestOwnerQuestion(payload: QuestionRepoGetBestOwnerQuestionInput): Promise<QuestionRepoGetBestOwnerQuestionOutput>;
  getOwnerQuestions(payload: QuestionRepoGetOwnerQuestionsInput): Promise<QuestionRepoGetOwnerQuestionsOutput>;
  search(payload: QuesitonRepoSearchInput): Promise<QuestionRepoSearchOutput>;
  isExist(payload: QuestionRepoIsExistsInput): Promise<QuestionRepoIsExistsOutput>;
  getViewer(payload: QuestionRepoGetViewerInput): Promise<QuestionRepoGetViewerOutput>;

  create(payload: QuestionRepoCreateInput): Promise<QuestionRepoCreateOutput>;
  update(payload: QuestionRepoUpdateInput): Promise<QuestionRepoUpdateOutput>;
  delete(payload: QuestionRepoDeleteInput): Promise<QuestionRepoDeleteOutput>;

  voteUp(payload: QuestionRepoVoteUpInput): Promise<QuestionRepoVoteUpOutput>;
  voteDown(payload: QuestionRepoVoteDownInput): Promise<QuestionRepoVoteDownOutput>;
  addViewer(payload: QuestionRepoAddViewerInput): Promise<QuestionRepoAddViewerOutput>;
  refTags(payload: QuestionRepoRefTagsInput): Promise<QuestionRepoRefTagsOutput>;
  unrefAllTags(payload: QuestionRepoUnrefAllTagsInput): Promise<QuestionRepoUnrefAllTagsOutput>;

  closeQuestion(payload: QuestionRepoCloseQuestionInput): Promise<QuestionRepoCloseQuestionOutput>;
  openQuestion(payload: QuestionRepoOpenQuestionInput): Promise<QuestionRepoOpenQuestionOutput>;
}