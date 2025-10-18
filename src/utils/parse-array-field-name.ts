export const parseArrayFieldName = (name: string) => {
  const regex = /(.*?)\[(-?\d+)\]\[(.*?)\]/;
  const match = name.match(regex);
  if (!match) return null;
  const [, baseName, index, fieldName] = match;
  return { baseName: baseName!, index: Number(index)!, fieldName: fieldName! };
};
