import { 
  QuestionAddViewerInput,
  QuestionAddViewerOutput,
  QuestionCloseInput,
  QuestionCloseOutput,
  QuestionCreateInput,
  QuestionCreateOutput,
  QuestionDeleteInput,
  QuestionDeleteOutput,
  QuestionGetInput,
  QuestionGetManyInput,
  QuestionGetManyOutput,
  QuestionGetOutput,
  QuestionGetVoteInput,
  QuestionGetVoteOutput,
  QuestionOpenInput,
  QuestionOpenOutput,
  QuestionUpdateInput,
  QuestionUpdateOutput,
  QuestionVoteInput,
  QuestionVoteOutput,
} from '@core/services/question/dtos';

import { 
  IQuestionAddViewerUseCase,
  IQuestionCloseUseCase,
  IQuestionCreateUseCase,
  IQuestionDeleteUseCase,
  IQuestionGetManyUseCase,
  IQuestionGetUseCase,
  IQuestionGetVoteUseCase,
  IQuestionOpenUseCase,
  IQuestionUpdateUseCase,
  IQuestionVoteUseCase,
} from '@core/services/question/types';

export class QuestionServiceFacade {
  constructor (
    private questionCreateUseCase: IQuestionCreateUseCase,
    private questionUpdateUseCase: IQuestionUpdateUseCase,
    private questionGetUseCase: IQuestionGetUseCase,
    private questionDeleteUseCase: IQuestionDeleteUseCase,
    private questionGetManyUseCase: IQuestionGetManyUseCase,
    private questionVoteUseCase: IQuestionVoteUseCase,
    private questionOpenUseCase: IQuestionOpenUseCase,
    private questionCloseUseCase: IQuestionCloseUseCase,
    private questionAddViewerUseCase: IQuestionAddViewerUseCase,
    private questionGetVoteUseCase: IQuestionGetVoteUseCase,
  ) {}

  static new ({
    questionCreateUseCase,
    questionUpdateUseCase,
    questionGetUseCase,
    questionDeleteUseCase,
    questionGetManyUseCase,
    questionVoteUseCase,
    questionOpenUseCase,
    questionCloseUseCase,
    questionAddViewerUseCase,
    questionGetVoteUseCase,
  }: {
    questionCreateUseCase: IQuestionCreateUseCase,
    questionUpdateUseCase: IQuestionUpdateUseCase,
    questionGetUseCase: IQuestionGetUseCase,
    questionDeleteUseCase: IQuestionDeleteUseCase,
    questionGetManyUseCase: IQuestionGetManyUseCase,
    questionVoteUseCase: IQuestionVoteUseCase,
    questionOpenUseCase: IQuestionOpenUseCase,
    questionCloseUseCase: IQuestionCloseUseCase,
    questionAddViewerUseCase: IQuestionAddViewerUseCase,
    questionGetVoteUseCase: IQuestionGetVoteUseCase,
  }) {
    return new QuestionServiceFacade(    
      questionCreateUseCase,
      questionUpdateUseCase,
      questionGetUseCase,
      questionDeleteUseCase,
      questionGetManyUseCase,
      questionVoteUseCase,
      questionOpenUseCase,
      questionCloseUseCase,
      questionAddViewerUseCase,
      questionGetVoteUseCase,
    );
  }

  create (payload: QuestionCreateInput): Promise<QuestionCreateOutput> {
    return this.questionCreateUseCase.execute(payload);
  }
  
  update (payload: QuestionUpdateInput): Promise<QuestionUpdateOutput> {
    return this.questionUpdateUseCase.execute(payload);
  }

  get (payload: QuestionGetInput): Promise<QuestionGetOutput> {
    return this.questionGetUseCase.execute(payload);
  }
  
  delete (payload: QuestionDeleteInput): Promise<QuestionDeleteOutput> {
    return this.questionDeleteUseCase.execute(payload);
  }
  
  getAll (payload: QuestionGetManyInput): Promise<QuestionGetManyOutput> {
    return this.questionGetManyUseCase.execute(payload);
  }
  
  vote (payload: QuestionVoteInput): Promise<QuestionVoteOutput> {
    return this.questionVoteUseCase.execute(payload);
  }
  
  open (payload: QuestionOpenInput): Promise<QuestionOpenOutput> {
    return this.questionOpenUseCase.execute(payload);
  }

  close (payload: QuestionCloseInput): Promise<QuestionCloseOutput> {
    return this.questionCloseUseCase.execute(payload);
  }

  addViewer (payload: QuestionAddViewerInput): Promise<QuestionAddViewerOutput> {
    return this.questionAddViewerUseCase.execute(payload);
  }

  getVote (payload: QuestionGetVoteInput): Promise<QuestionGetVoteOutput> {
    return this.questionGetVoteUseCase.execute(payload);
  }
}