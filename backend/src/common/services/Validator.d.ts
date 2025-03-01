export interface Validator<ValidatorInput> {
  validate(payload: ValidatorInput): void | Promise<void>;
}

export interface ValidatorUseCase<ValidatorInput, ValidatorOutput> {
  validate(payload: ValidatorInput): ValidatorOutput | Promise<ValidatorOutput>;
}