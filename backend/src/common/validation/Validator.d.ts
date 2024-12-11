export interface Validator<T = unknown, R = unknown> {
  validate(data: T): Promise<R>;
}