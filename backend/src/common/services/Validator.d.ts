export interface Validator<ValidatorInput, ValidatorOutput> {
  validate(payload: ValidatorInput): ValidatorOutput;
}

export interface ValidatorUseCase<ValidatorInput, ValidatorOutput> extends Validator<ValidatorInput, Promise<ValidatorOutput>> {}