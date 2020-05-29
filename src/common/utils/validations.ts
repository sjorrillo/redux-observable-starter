import { ObjectSchema } from 'yup';

import { createObjectByPath } from './obj-utils';

export interface IValidationResult {
  errors: string[];
  fields: { [key: string]: string };
}

export const validateSchema = async (
  values: object,
  schema: ObjectSchema
): Promise<IValidationResult> => {
  if (await schema.isValid(values)) return undefined;

  return await schema.validate(values, { recursive: true, abortEarly: false }).catch((err) => {
    return {
      errors: err.errors,
      fields: err.inner.reduce((acc, it) => createObjectByPath(acc, it.path, it.message), {}),
    } as any;
  });
};
