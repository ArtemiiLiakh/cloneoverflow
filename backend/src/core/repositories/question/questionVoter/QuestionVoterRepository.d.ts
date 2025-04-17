import { QuestionVoterRepoCreateInput, QuestionVoterRepoCreateOutput } from './dtos/Create';
import { QuestionVoterRepoGetInput, QuestionVoterRepoGetOutput } from './dtos/Get';
import { QuestionVoterRepoUpdateInput, QuestionVoterRepoUpdateOutput } from './dtos/Update';

export interface QuestionVoterRepository {
  create(payload: QuestionVoterRepoCreateInput): Promise<QuestionVoterRepoCreateOutput>;
  get(payload: QuestionVoterRepoGetInput): Promise<QuestionVoterRepoGetOutput>;
  update(payload: QuestionVoterRepoUpdateInput): Promise<QuestionVoterRepoUpdateOutput>;
}