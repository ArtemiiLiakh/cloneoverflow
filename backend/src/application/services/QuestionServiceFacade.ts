import { QuestionServiceInput } from "@core/service/question/dto/QuestionServiceInput";
import { QuestionServiceOutput } from "@core/service/question/dto/QuestionServiceOutput";
import { 
  IQuestionCloseUseCase, 
  IQuestionCreateUseCase, 
  IQuestionDeleteUseCase, 
  IQuestionGetAllUseCase, 
  IQuestionGetUseCase, 
  IQuestionUpdateUseCase, 
  IQuestionVoteUseCase 
} from "@core/service/question/types/usecases";

export class QuestionServiceFacade {
  constructor (
    private questionCreateUseCase: IQuestionCreateUseCase,
    private questionUpdateUseCase: IQuestionUpdateUseCase,
    private questionGetUseCase: IQuestionGetUseCase,
    private questionDeleteUseCase: IQuestionDeleteUseCase,
    private questionGetAllUseCase: IQuestionGetAllUseCase,
    private questionVoteUseCase: IQuestionVoteUseCase,
    private questionCloseUseCase: IQuestionCloseUseCase,
  ) {}

  create(payload: QuestionServiceInput.Create): Promise<QuestionServiceOutput.Create> {
    return this.questionCreateUseCase.execute(payload);
  }
  
  update(payload: QuestionServiceInput.Update): Promise<QuestionServiceOutput.Update> {
    return this.questionUpdateUseCase.execute(payload);
  }

  get(payload: QuestionServiceInput.Get): Promise<QuestionServiceOutput.Get> {
    return this.questionGetUseCase.execute(payload);
  }
  
  delete(payload: QuestionServiceInput.Delete): Promise<QuestionServiceOutput.Delete> {
    return this.questionDeleteUseCase.execute(payload);
  }
  
  getAll(payload: QuestionServiceInput.GetAll): Promise<QuestionServiceOutput.GetAll> {
    return this.questionGetAllUseCase.execute(payload);
  }
  
  vote(payload: QuestionServiceInput.VoteQuestion): Promise<QuestionServiceOutput.VoteQuestion> {
    return this.questionVoteUseCase.execute(payload);
  }
  
  close(payload: QuestionServiceInput.CloseQuestion): Promise<QuestionServiceOutput.CloseQuestion> {
    return this.questionCloseUseCase.execute(payload);
  }
}