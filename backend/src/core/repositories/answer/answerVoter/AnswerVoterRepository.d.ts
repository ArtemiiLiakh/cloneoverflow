import { AnswerVoterRepoCreateInput, AnswerVoterRepoCreateOutput } from './dtos/Create';
import { AnswerVoterRepoGetInput, AnswerVoterRepoGetOutput } from './dtos/Get';
import { AnswerVoterRepoUpdateInput, AnswerVoterRepoUpdateOutput } from './dtos/Update';

export interface AnswerVoterRepository {
  create(payload: AnswerVoterRepoCreateInput): Promise<AnswerVoterRepoCreateOutput>;
  get(payload: AnswerVoterRepoGetInput): Promise<AnswerVoterRepoGetOutput>;
  update(payload: AnswerVoterRepoUpdateInput): Promise<AnswerVoterRepoUpdateOutput>;
}