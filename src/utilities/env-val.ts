import { nullish } from './nullish';

const envVal = (key, defaultValue) => {
  const value = process.env[key];
  console.log({ key, value, process });
  if (nullish(value) || value === '') return defaultValue;
  return value || defaultValue;
};

export default envVal;
