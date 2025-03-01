import { UserRatingActions } from '@common/enums/UserRatingActions';
import { UserRatingSystem } from '@core/repositories/ratingSystem/UserRatingSystem';
import fs from 'fs/promises';

interface JSONRatingSchema {
  question: {
    voteUp: number,
    voteDown: number,
    update: number,
    open: number,
    close: number,
    delete: number,
  },
  answer: {
    voteUp: number,
    voteDown: number,
    update: number,
    delete: number,
  },
}

export class JSONUserRatingSystem implements UserRatingSystem {
  private ratingSchema: JSONRatingSchema;

  constructor (
    private filepath: string,
  ) {}

  async readFile () {
    this.ratingSchema = JSON.parse(
      await fs.readFile(this.filepath, {
        encoding: 'utf-8',
      }),
    ) as JSONRatingSchema;
  }

  async getMinRating (action: UserRatingActions): Promise<number> {
    const shemaMapper: Record<UserRatingActions, number> = {
      [UserRatingActions.QuestionClose]: this.ratingSchema.question.close,
      [UserRatingActions.QuestionDelete]: this.ratingSchema.question.delete,
      [UserRatingActions.QuestionOpen]: this.ratingSchema.question.open,
      [UserRatingActions.QuestionUpdate]: this.ratingSchema.question.update,
      [UserRatingActions.QuestionVoteDown]: this.ratingSchema.question.voteDown,
      [UserRatingActions.QuestionVoteUp]: this.ratingSchema.question.voteUp,
      
      [UserRatingActions.AnswerDelete]: this.ratingSchema.answer.delete,
      [UserRatingActions.AnswerUpdate]: this.ratingSchema.answer.update,
      [UserRatingActions.AnswerVoteDown]: this.ratingSchema.answer.voteDown,
      [UserRatingActions.AnswerVoteUp]: this.ratingSchema.answer.voteUp,
    };

    return shemaMapper[action];
  }
}