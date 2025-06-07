export class Tag {
  constructor (
    public id: string,
    public name: string,
  ) {}

  static new (properties: {
    id: string,
    name: string,
  }): Tag {
    return new Tag(
      properties.id,
      properties.name,
    );
  }
}