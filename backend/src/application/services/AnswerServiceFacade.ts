import { AnswerCreateInput, AnswerCreateOutput } from '@core/services/answer/create/dto';
import { AnswerDeleteInput, AnswerDeleteOutput } from '@core/services/answer/delete/dto';
import { AnswerGetInput, AnswerGetOutput } from '@core/services/answer/get/dto';
import { AnswerGetManyInput, AnswerGetManyOutput } from '@core/services/answer/getMany/dto';
import { AnswerGetVoterInput, AnswerGetVoterOutput } from '@core/services/answer/getVoter/dto';
import { IAnswerGetVoterUseCase } from '@core/services/answer/getVoter/type';
import {
  IAnswerCreateUseCase,
  IAnswerDeleteUseCase,
  IAnswerGetManyUseCase,
  IAnswerGetUseCase,
  IAnswerUpdateUseCase,
  IAnswerVoteUseCase,
} from '@core/services/answer/types';
import { AnswerUpdateInput, AnswerUpdateOutput } from '@core/services/answer/update/dto';
import { AnswerVoteInput, AnswerVoteOutput } from '@core/services/answer/vote/dto';

export class AnswerServiceFacade {
  constructor (
    private answerCreateUseCase: IAnswerCreateUseCase,
    private answerUpdateUseCase: IAnswerUpdateUseCase,
    private answerDeleteUseCase: IAnswerDeleteUseCase,
    private answerGetUseCase: IAnswerGetUseCase,
    private answerGetAllUseCase: IAnswerGetManyUseCase,
    private answerVoteUseCase: IAnswerVoteUseCase,
    private answerGetVoterUseCase: IAnswerGetVoterUseCase,
  ) {}

  static new ({
    answerCreateUseCase,
    answerUpdateUseCase,
    answerDeleteUseCase,
    answerGetUseCase,
    answerGetAllUseCase,
    answerVoteUseCase,
    answerGetVoterUseCase,
  }: {
    answerCreateUseCase: IAnswerCreateUseCase,
    answerUpdateUseCase: IAnswerUpdateUseCase,
    answerDeleteUseCase: IAnswerDeleteUseCase,
    answerGetUseCase: IAnswerGetUseCase,
    answerGetAllUseCase: IAnswerGetManyUseCase,
    answerVoteUseCase: IAnswerVoteUseCase,
    answerGetVoterUseCase: IAnswerGetVoterUseCase,
  }) {
    return new AnswerServiceFacade(
      answerCreateUseCase,
      answerUpdateUseCase,
      answerDeleteUseCase,
      answerGetUseCase,
      answerGetAllUseCase,
      answerVoteUseCase,
      answerGetVoterUseCase,
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

  getAll (payload: AnswerGetManyInput): Promise<AnswerGetManyOutput> {
    return this.answerGetAllUseCase.execute(payload);
  }

  vote (payload: AnswerVoteInput): Promise<AnswerVoteOutput> {
    return this.answerVoteUseCase.execute(payload);
  }

  getVoter (payload: AnswerGetVoterInput): Promise<AnswerGetVoterOutput> {
    return this.answerGetVoterUseCase.execute(payload);
  }
}