import {
  IAnswerCreateUseCase,
  IAnswerDeleteUseCase,
  IAnswerGetManyUseCase,
  IAnswerGetUseCase,
  IAnswerGetVoteUseCase,
  IAnswerUpdateUseCase,
  IAnswerVoteUseCase,
} from '@core/services/answer/types';

import {
  AnswerCreateInput,
  AnswerCreateOutput,
  AnswerDeleteInput,
  AnswerDeleteOutput,
  AnswerGetInput,
  AnswerGetManyInput,
  AnswerGetManyOutput,
  AnswerGetOutput,
  AnswerGetVoteInput,
  AnswerGetVoteOutput,
  AnswerUpdateInput,
  AnswerUpdateOutput,
  AnswerVoteInput,
  AnswerVoteOutput,
} from '@core/services/answer/dtos';

export class AnswerServiceFacade {
  constructor (
    private answerCreateUseCase: IAnswerCreateUseCase,
    private answerUpdateUseCase: IAnswerUpdateUseCase,
    private answerDeleteUseCase: IAnswerDeleteUseCase,
    private answerGetUseCase: IAnswerGetUseCase,
    private answerGetManyUseCase: IAnswerGetManyUseCase,
    private answerVoteUseCase: IAnswerVoteUseCase,
    private answerGetVoteUseCase: IAnswerGetVoteUseCase,
  ) {}

  static new ({
    answerCreateUseCase,
    answerUpdateUseCase,
    answerDeleteUseCase,
    answerGetUseCase,
    answerGetManyUseCase,
    answerVoteUseCase,
    answerGetVoteUseCase,
  }: {
    answerCreateUseCase: IAnswerCreateUseCase,
    answerUpdateUseCase: IAnswerUpdateUseCase,
    answerDeleteUseCase: IAnswerDeleteUseCase,
    answerGetUseCase: IAnswerGetUseCase,
    answerGetManyUseCase: IAnswerGetManyUseCase,
    answerVoteUseCase: IAnswerVoteUseCase,
    answerGetVoteUseCase: IAnswerGetVoteUseCase,
  }) {
    return new AnswerServiceFacade(
      answerCreateUseCase,
      answerUpdateUseCase,
      answerDeleteUseCase,
      answerGetUseCase,
      answerGetManyUseCase,
      answerVoteUseCase,
      answerGetVoteUseCase,
    );
  }

  create (payload: AnswerCreateInput): Promise<AnswerCreateOutput> {
    return this.answerCreateUseCase.execute(payload);
  }

  update (payload: AnswerUpdateInput): Promise<AnswerUpdateOutput> {
    return this.answerUpdateUseCase.execute(payload);
  }

  delete (payload: AnswerDeleteInput): Promise<AnswerDeleteOutput> {
    return this.answerDeleteUseCase.execute(payload);
  }

  get (payload: AnswerGetInput): Promise<AnswerGetOutput> {
    return this.answerGetUseCase.execute(payload);
  }

  getMany (payload: AnswerGetManyInput): Promise<AnswerGetManyOutput> {
    return this.answerGetManyUseCase.execute(payload);
  }

  vote (payload: AnswerVoteInput): Promise<AnswerVoteOutput> {
    return this.answerVoteUseCase.execute(payload);
  }

  getVote (payload: AnswerGetVoteInput): Promise<AnswerGetVoteOutput> {
    return this.answerGetVoteUseCase.execute(payload);
  }
}