import { ValidateOptions, ObjectSchema } from 'yup';

import { createObjectByPath } from './obj-utils';

export const validateSchema = async (
  values: object,
  schema: ObjectSchema,
  options: ValidateOptions
) => {
  if (await schema.isValid(values)) return undefined;

  return await schema
    .validate(values, options)
    .catch(err => err.inner.reduce((acc, it) => createObjectByPath(acc, it.path, it.message), {}));
};
