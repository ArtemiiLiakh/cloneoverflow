import { AnswerServiceInput } from '@core/services/answer/dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '@core/services/answer/dtos/AnswerServiceOutput';
import {
  IAnswerCreateUseCase,
  IAnswerDeleteUseCase,
  IAnswerGetAllUseCase,
  IAnswerGetUseCase,
  IAnswerUpdateUseCase,
  IAnswerVoteUseCase,
} from '@core/services/answer/types/usecases';

export class AnswerServiceFacade {
  constructor (
    private answerCreateUseCase: IAnswerCreateUseCase,
    private answerUpdateUseCase: IAnswerUpdateUseCase,
    private answerDeleteUseCase: IAnswerDeleteUseCase,
    private answerGetUseCase: IAnswerGetUseCase,
    private answerGetAllUseCase: IAnswerGetAllUseCase,
    private answerVoteUseCase: IAnswerVoteUseCase,
  ) {}

  static new ({
    answerCreateUseCase,
    answerUpdateUseCase,
    answerDeleteUseCase,
    answerGetUseCase,
    answerGetAllUseCase,
    answerVoteUseCase,    
  }: {
    answerCreateUseCase: IAnswerCreateUseCase,
    answerUpdateUseCase: IAnswerUpdateUseCase,
    answerDeleteUseCase: IAnswerDeleteUseCase,
    answerGetUseCase: IAnswerGetUseCase,
    answerGetAllUseCase: IAnswerGetAllUseCase,
    answerVoteUseCase: IAnswerVoteUseCase,
  }) {
    return new AnswerServiceFacade(
      answerCreateUseCase,
      answerUpdateUseCase,
      answerDeleteUseCase,
      answerGetUseCase,
      answerGetAllUseCase,
      answerVoteUseCase,      
    );
  }

  create (payload: AnswerServiceInput.Create): Promise<AnswerServiceOutput.Create> {
    return this.answerCreateUseCase.execute(payload);
  }

  update (payload: AnswerServiceInput.Update): Promise<AnswerServiceOutput.Update> {
    return this.answerUpdateUseCase.execute(payload);
  }

  delete (payload: AnswerServiceInput.Delete): Promise<AnswerServiceOutput.Delete> {
    return this.answerDeleteUseCase.execute(payload);
  }

  get (payload: AnswerServiceInput.Get): Promise<AnswerServiceOutput.Get> {
    return this.answerGetUseCase.execute(payload);
  }

  getAll (payload: AnswerServiceInput.GetAll): Promise<AnswerServiceOutput.GetAll> {
    return this.answerGetAllUseCase.execute(payload);
  }

  vote (payload: AnswerServiceInput.VoteAnswer): Promise<AnswerServiceOutput.VoteAnswer> {
    return this.answerVoteUseCase.execute(payload);
  }
}