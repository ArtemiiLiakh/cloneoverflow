import { parse, stringify } from 'uuid';

export const uuidToBytes = (uuid: string) => {
  const buffer = Buffer.from(parse(uuid));
  return buffer;
};

export const bytesToUUID = (bytes: Buffer) => {
  return stringify(new Uint8Array(bytes));
};