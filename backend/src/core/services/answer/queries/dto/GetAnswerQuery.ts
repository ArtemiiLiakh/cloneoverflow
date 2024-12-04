import { Answer } from '@core/domain/entities/Answer';

export class GetAnswerQuery {
  constructor (
    public readonly id: string,
  ) {}
}

export type GetAnswerQueryResponse = Answer | null;