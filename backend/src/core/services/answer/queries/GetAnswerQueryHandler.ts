import { QueryHandler } from '@common/cqrs/QueryHandler';
import { GetAnswerQuery, GetAnswerQueryResponse } from './dto/GetAnswerQuery';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';

export class GetAnswerQueryHandler implements QueryHandler<GetAnswerQuery, GetAnswerQueryResponse> {
  public query = GetAnswerQuery;

  constructor (
    public answerRepository: AnswerRepository,
  ) {}

  handle ({ id }: GetAnswerQuery): Promise<GetAnswerQueryResponse> {
    return this.answerRepository.findById({
      id,
    }).then(res => res?.entity ?? null);
  }
}