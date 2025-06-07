import { QuestionVoterRepoCreateInput, QuestionVoterRepoCreateOutput } from './dtos/questionVoter/Create';
import { QuestionVoterRepoGetInput, QuestionVoterRepoGetOutput } from './dtos/questionVoter/Get';
import { QuestionVoterRepoUpdateInput, QuestionVoterRepoUpdateOutput } from './dtos/questionVoter/Update';

export interface QuestionVoterRepository {
  create(payload: QuestionVoterRepoCreateInput): Promise<QuestionVoterRepoCreateOutput>;
  get(payload: QuestionVoterRepoGetInput): Promise<QuestionVoterRepoGetOutput>;
  update(payload: QuestionVoterRepoUpdateInput): Promise<QuestionVoterRepoUpdateOutput>;
}