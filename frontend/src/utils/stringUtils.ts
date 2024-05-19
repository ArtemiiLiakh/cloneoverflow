export const ShortText = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + '...';
  }
  else {
    return text;
  }
}

export const formatArray = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (!value) {
    return;
  }
  return [value];
}