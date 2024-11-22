export interface CoreResponse<B=object> {
  send(value: B): void;
  setCookie(name: string, value: string): void;
  status(code: number): void;
}