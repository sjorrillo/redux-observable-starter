import { boolean, InferType, object, string } from 'yup';

export const LoginSchema = object().shape({
  email: string().required().email(),
  password: string().required(),
  rememberMe: boolean().notRequired().nullable(),
});

export type LoginType = InferType<typeof LoginSchema>;
