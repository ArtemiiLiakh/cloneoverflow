export interface CoreResponse<B=any> {
  send(value: B): void;
  setCookie(name: string, value: string): void;
  status(code: number): void;
}