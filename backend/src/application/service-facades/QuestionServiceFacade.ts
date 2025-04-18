import {
  QuestionAddViewerInput,
  QuestionAddViewerOutput,
  QuestionCloseInput,
  QuestionCloseOutput,
  QuestionCreateInput,
  QuestionCreateOutput,
  QuestionDeleteInput,
  QuestionDeleteOutput,
  QuestionGetDetailsInput,
  QuestionGetDetailsOutput,
  QuestionGetInput,
  QuestionGetOutput,
  QuestionGetVoterInput,
  QuestionGetVoterOutput,
  QuestionOpenInput,
  QuestionOpenOutput,
  QuestionUpdateInput,
  QuestionUpdateOutput,
  QuestionVoteInput,
  QuestionVoteOutput,
} from '@core/services/question/dtos';
import { QuestionToggleFavoriteInput, QuestionToggleFavoriteOutput } from '@core/services/question/toggleFavorite/dto';
import { IQuestionToggleFavoriteUseCase } from '@core/services/question/toggleFavorite/type';

import {
  IQuestionAddViewerUseCase,
  IQuestionCloseUseCase,
  IQuestionCreateUseCase,
  IQuestionDeleteUseCase,
  IQuestionGetDetailsUseCase,
  IQuestionGetUseCase,
  IQuestionGetVoterUseCase,
  IQuestionOpenUseCase,
  IQuestionUpdateUseCase,
  IQuestionVoteUseCase,
} from '@core/services/question/types';

export class QuestionServiceFacade {
  constructor (
    private AddViewerUseCase: IQuestionAddViewerUseCase,
    private CloseUseCase: IQuestionCloseUseCase,
    private CreateUseCase: IQuestionCreateUseCase,
    private DeleteUseCase: IQuestionDeleteUseCase,
    private GetUseCase: IQuestionGetUseCase,
    private GetDetailsUseCase: IQuestionGetDetailsUseCase,
    private GetVoterUseCase: IQuestionGetVoterUseCase,
    private OpenUseCase: IQuestionOpenUseCase,
    private UpdateUseCase: IQuestionUpdateUseCase,
    private VoteUseCase: IQuestionVoteUseCase,
    private ToggleFavoriteUseCase: IQuestionToggleFavoriteUseCase,
  ) {}

  static new ({
    AddViewerUseCase,
    CloseUseCase,
    CreateUseCase,
    DeleteUseCase,
    GetUseCase,
    GetDetailsUseCase,
    GetVoterUseCase,
    OpenUseCase,
    UpdateUseCase,
    VoteUseCase,
    ToggleFavoriteUseCase,
  }: {
    AddViewerUseCase: IQuestionAddViewerUseCase,
    CloseUseCase: IQuestionCloseUseCase,
    CreateUseCase: IQuestionCreateUseCase,
    DeleteUseCase: IQuestionDeleteUseCase,
    GetUseCase: IQuestionGetUseCase,
    GetDetailsUseCase: IQuestionGetDetailsUseCase,
    GetVoterUseCase: IQuestionGetVoterUseCase,
    OpenUseCase: IQuestionOpenUseCase,
    UpdateUseCase: IQuestionUpdateUseCase,
    VoteUseCase: IQuestionVoteUseCase,
    ToggleFavoriteUseCase: IQuestionToggleFavoriteUseCase,
  }): QuestionServiceFacade {
    return new QuestionServiceFacade(    
      AddViewerUseCase,
      CloseUseCase,
      CreateUseCase,
      DeleteUseCase,
      GetUseCase,
      GetDetailsUseCase,
      GetVoterUseCase,
      OpenUseCase,
      UpdateUseCase,
      VoteUseCase,
      ToggleFavoriteUseCase,
    );
  }

  addViewer (payload: QuestionAddViewerInput): Promise<QuestionAddViewerOutput> {
    return this.AddViewerUseCase.execute(payload);
  }

  close (payload: QuestionCloseInput): Promise<QuestionCloseOutput> {
    return this.CloseUseCase.execute(payload);
  }

  create (payload: QuestionCreateInput): Promise<QuestionCreateOutput> {
    return this.CreateUseCase.execute(payload);
  }

  delete (payload: QuestionDeleteInput): Promise<QuestionDeleteOutput> {
    return this.DeleteUseCase.execute(payload);
  }

  get (payload: QuestionGetInput): Promise<QuestionGetOutput> {
    return this.GetUseCase.execute(payload);
  }

  getDetails (payload: QuestionGetDetailsInput): Promise<QuestionGetDetailsOutput> {
    return this.GetDetailsUseCase.execute(payload);
  }

  getVoter (payload: QuestionGetVoterInput): Promise<QuestionGetVoterOutput> {
    return this.GetVoterUseCase.execute(payload);
  }

  open (payload: QuestionOpenInput): Promise<QuestionOpenOutput> {
    return this.OpenUseCase.execute(payload);
  }

  update (payload: QuestionUpdateInput): Promise<QuestionUpdateOutput> {
    return this.UpdateUseCase.execute(payload);
  }

  vote (payload: QuestionVoteInput): Promise<QuestionVoteOutput> {
    return this.VoteUseCase.execute(payload);
  }

  toggleFavorite (payload: QuestionToggleFavoriteInput): Promise<QuestionToggleFavoriteOutput> {
    return this.ToggleFavoriteUseCase.execute(payload);
  }
}