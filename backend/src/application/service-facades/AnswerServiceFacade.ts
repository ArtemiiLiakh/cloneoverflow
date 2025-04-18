import {
  IAnswerCreateUseCase,
  IAnswerDeleteUseCase,
  IAnswerGetByQuestionUseCase,
  IAnswerGetUseCase,
  IAnswerGetVoterUseCase,
  IAnswerUpdateUseCase,
  IAnswerVoteUseCase,
} from '@core/services/answer/types';

import {
  AnswerCreateInput,
  AnswerCreateOutput,
  AnswerDeleteInput,
  AnswerDeleteOutput,
  AnswerGetInput,
  AnswerGetOutput,
  AnswerGetByQuestionInput,
  AnswerGetByQuestionOutput,
  AnswerGetVoterInput,
  AnswerGetVoterOutput,
  AnswerUpdateInput,
  AnswerUpdateOutput,
  AnswerVoteInput,
  AnswerVoteOutput,
} from '@core/services/answer/dtos';

export class AnswerServiceFacade {
  constructor (
    private CreateUseCase: IAnswerCreateUseCase,
    private UpdateUseCase: IAnswerUpdateUseCase,
    private DeleteUseCase: IAnswerDeleteUseCase,
    private GetUseCase: IAnswerGetUseCase,
    private GetVoterUseCase: IAnswerGetVoterUseCase,
    private VoteUseCase: IAnswerVoteUseCase,
    private GetQuestionAnswersUseCase: IAnswerGetByQuestionUseCase,
  ) {}

  static new ({
    CreateUseCase,
    UpdateUseCase,
    DeleteUseCase,
    GetUseCase,
    GetVoterUseCase,
    VoteUseCase,
    GetQuestionAnswersUseCase,
  }: {
    CreateUseCase: IAnswerCreateUseCase,
    UpdateUseCase: IAnswerUpdateUseCase,
    DeleteUseCase: IAnswerDeleteUseCase,
    GetUseCase: IAnswerGetUseCase,
    GetVoterUseCase: IAnswerGetVoterUseCase,
    VoteUseCase: IAnswerVoteUseCase,
    GetQuestionAnswersUseCase: IAnswerGetByQuestionUseCase,
  }): AnswerServiceFacade {
    return new AnswerServiceFacade(
      CreateUseCase,
      UpdateUseCase,
      DeleteUseCase,
      GetUseCase,
      GetVoterUseCase,
      VoteUseCase,
      GetQuestionAnswersUseCase,
    );
  }

  create (payload: AnswerCreateInput): Promise<AnswerCreateOutput> {
    return this.CreateUseCase.execute(payload);
  }

  delete (payload: AnswerDeleteInput): Promise<AnswerDeleteOutput> {
    return this.DeleteUseCase.execute(payload);
  }
  
  get (payload: AnswerGetInput): Promise<AnswerGetOutput> {
    return this.GetUseCase.execute(payload);
  }

  getVoter (payload: AnswerGetVoterInput): Promise<AnswerGetVoterOutput> {
    return this.GetVoterUseCase.execute(payload);
  }

  update (payload: AnswerUpdateInput): Promise<AnswerUpdateOutput> {
    return this.UpdateUseCase.execute(payload);
  }

  vote (payload: AnswerVoteInput): Promise<AnswerVoteOutput> {
    return this.VoteUseCase.execute(payload);
  }

  getByQuestion (payload: AnswerGetByQuestionInput): Promise<AnswerGetByQuestionOutput> {
    return this.GetQuestionAnswersUseCase.execute(payload);
  }
}