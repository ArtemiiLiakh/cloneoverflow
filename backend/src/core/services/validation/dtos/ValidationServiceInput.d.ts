export namespace ValidationServiceInput {
  export type ValidateUser = {
    userId: string;
  }

  export type ValidateQuestion = {
    questionId: string;
  }

  export type ValidateTag = {
    tagId?: string;
    name?: string;
  }
  
  export type ValidateAnswer = {
    answerId: string;
  }
}