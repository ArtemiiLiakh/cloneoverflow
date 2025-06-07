import { AnswerRepoClearSolutionsInput, AnswerRepoClearSolutionsOutput } from './dtos/ClearSolutions';
import { AnswerRepoCreateInput, AnswerRepoCreateOutput } from './dtos/Create';
import { AnswerRepoDeleteInput, AnswerRepoDeleteOutput } from './dtos/Delete';
import { AnswerRepoGetBestOwnerAnswerInput, AnswerRepoGetBestOwnerAnswerOutput } from './dtos/GetBestOwnerAnswer';
import { AnswerRepoGetByIdInput, AnswerRepoGetByIdOutput } from './dtos/GetById';
import { AnswerRepoGetDetailedByIdInput, AnswerRepoGetDetailedByIdOutput } from './dtos/GetDetailedById';
import { AnswerRepoGetOwnerAnswersInput, AnswerRepoGetOwnerAnswersOutput } from './dtos/GetOwnerAnswers';
import { AnswerRepoGetQuestionAnswersInput, AnswerRepoGetQuestionAnswersOutput } from './dtos/GetQuestionAnswers';
import { AnswerRepoIsExistInput, AnswerRepoIsExistOutput } from './dtos/IsExist';
import { AnswerRepoSetAsSolutionInput, AnswerRepoSetAsSolutionOutput } from './dtos/SetAsSolution';
import { AnswerRepoUpdateInput, AnswerRepoUpdateOutput } from './dtos/Update';
import { AnswerRepoVoteDownInput, AnswerRepoVoteDownOutput } from './dtos/VoteDown';
import { AnswerRepoVoteUpInput, AnswerRepoVoteUpOutput } from './dtos/VoteUp';

export interface AnswerRepository {
  getById(payload: AnswerRepoGetByIdInput): Promise<AnswerRepoGetByIdOutput>;
  getDetailedById(payload: AnswerRepoGetDetailedByIdInput): Promise<AnswerRepoGetDetailedByIdOutput>;
  getBestOwnerAnswer(payload: AnswerRepoGetBestOwnerAnswerInput): Promise<AnswerRepoGetBestOwnerAnswerOutput>;
  getByQuestionId(payload: AnswerRepoGetQuestionAnswersInput): Promise<AnswerRepoGetQuestionAnswersOutput>;
  getOwnerAnswers(payload: AnswerRepoGetOwnerAnswersInput): Promise<AnswerRepoGetOwnerAnswersOutput>;
  isExist(payload: AnswerRepoIsExistInput): Promise<AnswerRepoIsExistOutput>;

  create(payload: AnswerRepoCreateInput): Promise<AnswerRepoCreateOutput>;
  update(payload: AnswerRepoUpdateInput): Promise<AnswerRepoUpdateOutput>;
  delete(payload: AnswerRepoDeleteInput): Promise<AnswerRepoDeleteOutput>;
  
  setAsSolution(payload: AnswerRepoSetAsSolutionInput): Promise<AnswerRepoSetAsSolutionOutput>;
  clearSolution(payload: AnswerRepoClearSolutionsInput): Promise<AnswerRepoClearSolutionsOutput>;
  voteUp(payload: AnswerRepoVoteUpInput): Promise<AnswerRepoVoteUpOutput>;
  voteDown(payload: AnswerRepoVoteDownInput): Promise<AnswerRepoVoteDownOutput>;
}