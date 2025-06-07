import { AnswerVoterRepoCreateInput, AnswerVoterRepoCreateOutput } from './dtos/answerVoter/Create';
import { AnswerVoterRepoGetInput, AnswerVoterRepoGetOutput } from './dtos/answerVoter/Get';
import { AnswerVoterRepoUpdateInput, AnswerVoterRepoUpdateOutput } from './dtos/answerVoter/Update';

export interface AnswerVoterRepository {
  create(payload: AnswerVoterRepoCreateInput): Promise<AnswerVoterRepoCreateOutput>;
  get(payload: AnswerVoterRepoGetInput): Promise<AnswerVoterRepoGetOutput>;
  update(payload: AnswerVoterRepoUpdateInput): Promise<AnswerVoterRepoUpdateOutput>;
}