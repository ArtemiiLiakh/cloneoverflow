export interface Validator<ValidatorInput, ValidatorOutput=void> {
  validate(payload: ValidatorInput): ValidatorOutput | Promise<ValidatorOutput>;
}