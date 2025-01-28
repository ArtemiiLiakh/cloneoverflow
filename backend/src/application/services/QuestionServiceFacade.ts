import { QuestionAddViewerInput, QuestionAddViewerOutput } from '@core/services/question/addViewer/dto';
import { QuestionCloseInput, QuestionCloseOutput } from '@core/services/question/close/dto';
import { QuestionCreateInput, QuestionCreateOutput } from '@core/services/question/create/dto';
import { QuestionDeleteInput, QuestionDeleteOutput } from '@core/services/question/delete/dto';
import { QuestionGetInput, QuestionGetOutput } from '@core/services/question/get/dto';
import { QuestionGetManyInput, QuestionGetManyOutput } from '@core/services/question/getMany/dto';
import { QuestionGetVoterInput, QuestionGetVoterOutput } from '@core/services/question/getVoter/dto';
import { QuestionOpenInput, QuestionOpenOutput } from '@core/services/question/open/dto';
import {
  IQuestionAddViewerUseCase,
  IQuestionCloseUseCase,
  IQuestionCreateUseCase,
  IQuestionDeleteUseCase,
  IQuestionGetManyUseCase,
  IQuestionGetUseCase,
  IQuestionGetVoterUseCase,
  IQuestionOpenUseCase,
  IQuestionUpdateUseCase,
  IQuestionVoteUseCase,
} from '@core/services/question/types';
import { QuestionUpdateInput, QuestionUpdateOutput } from '@core/services/question/update/dto';
import { QuestionVoteInput, QuestionVoteOutput } from '@core/services/question/vote/dto';

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
    private questionGetVoterUseCase: IQuestionGetVoterUseCase,
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
    questionGetVoterUseCase,
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
    questionGetVoterUseCase: IQuestionGetVoterUseCase,
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
      questionGetVoterUseCase,
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

  getVoter (payload: QuestionGetVoterInput): Promise<QuestionGetVoterOutput> {
    return this.questionGetVoterUseCase.execute(payload);
  }
}