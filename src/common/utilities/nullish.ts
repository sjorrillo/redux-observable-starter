export const nullish = <TType>(value: TType | undefined | null): boolean =>
  typeof value === 'undefined' || value === null;
