import { QuestionServiceInput } from '@core/services/question/dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '@core/services/question/dtos/QuestionServiceOutput';
import {
  IQuestionCloseUseCase,
  IQuestionCreateUseCase,
  IQuestionDeleteUseCase,
  IQuestionGetAllUseCase,
  IQuestionGetUseCase,
  IQuestionOpenUseCase,
  IQuestionUpdateUseCase,
  IQuestionVoteUseCase,
} from '@core/services/question/types/usecases';

export class QuestionServiceFacade {
  constructor (
    private questionCreateUseCase: IQuestionCreateUseCase,
    private questionUpdateUseCase: IQuestionUpdateUseCase,
    private questionGetUseCase: IQuestionGetUseCase,
    private questionDeleteUseCase: IQuestionDeleteUseCase,
    private questionGetAllUseCase: IQuestionGetAllUseCase,
    private questionVoteUseCase: IQuestionVoteUseCase,
    private questionOpenUseCase: IQuestionOpenUseCase,
    private questionCloseUseCase: IQuestionCloseUseCase,
  ) {}

  static new ({
    questionCreateUseCase,
    questionUpdateUseCase,
    questionGetUseCase,
    questionDeleteUseCase,
    questionGetAllUseCase,
    questionVoteUseCase,
    questionOpenUseCase,
    questionCloseUseCase,
  }: {
    questionCreateUseCase: IQuestionCreateUseCase,
    questionUpdateUseCase: IQuestionUpdateUseCase,
    questionGetUseCase: IQuestionGetUseCase,
    questionDeleteUseCase: IQuestionDeleteUseCase,
    questionGetAllUseCase: IQuestionGetAllUseCase,
    questionVoteUseCase: IQuestionVoteUseCase,
    questionOpenUseCase: IQuestionOpenUseCase,
    questionCloseUseCase: IQuestionCloseUseCase,
  }) {
    return new QuestionServiceFacade(    
      questionCreateUseCase,
      questionUpdateUseCase,
      questionGetUseCase,
      questionDeleteUseCase,
      questionGetAllUseCase,
      questionVoteUseCase,
      questionOpenUseCase,
      questionCloseUseCase,
    );
  }

  create (payload: QuestionServiceInput.Create): Promise<QuestionServiceOutput.Create> {
    return this.questionCreateUseCase.execute(payload);
  }
  
  update (payload: QuestionServiceInput.Update): Promise<QuestionServiceOutput.Update> {
    return this.questionUpdateUseCase.execute(payload);
  }

  get (payload: QuestionServiceInput.Get): Promise<QuestionServiceOutput.Get> {
    return this.questionGetUseCase.execute(payload);
  }
  
  delete (payload: QuestionServiceInput.Delete): Promise<QuestionServiceOutput.Delete> {
    return this.questionDeleteUseCase.execute(payload);
  }
  
  getAll (payload: QuestionServiceInput.GetAll): Promise<QuestionServiceOutput.GetAll> {
    return this.questionGetAllUseCase.execute(payload);
  }
  
  vote (payload: QuestionServiceInput.VoteQuestion): Promise<QuestionServiceOutput.VoteQuestion> {
    return this.questionVoteUseCase.execute(payload);
  }
  
  open (payload: QuestionServiceInput.OpenQuestion): Promise<QuestionServiceOutput.OpenQuestion> {
    return this.questionOpenUseCase.execute(payload);
  }

  close (payload: QuestionServiceInput.CloseQuestion): Promise<QuestionServiceOutput.CloseQuestion> {
    return this.questionCloseUseCase.execute(payload);
  }
}