export type QuestionToggleFavoriteInput = {
  questionId: string,
  executorId: string,
  action: 'add' | 'delete'
}

export type QuestionToggleFavoriteOutput = void;