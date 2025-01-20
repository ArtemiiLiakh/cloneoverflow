export interface Validator<T, R> {
  validate(value: T): R;
}