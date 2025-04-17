export class Tag {
  constructor (
    public id: string,
    public name: string,
  ) {}

  static new ({
    id,
    name,
  }: {
    id: string,
    name: string,
  }): Tag {
    return new Tag(
      id,
      name,
    );
  }
}