export const isObjectEmpty = (obj: object | object[] | null | undefined) => {
  return obj === undefined
    || obj === null 
    || Array.isArray(obj) && obj.length === 0
    || Object.keys(obj).length === 0;
};
