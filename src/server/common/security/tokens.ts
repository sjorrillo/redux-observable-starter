import jwt from 'jsonwebtoken';

export const JWT_SECRET = {
  type: 'HS256',
  key: '3EK6FD+o0+c7tzBNVfjpMkNDi2yARAAKzQlk8O2IKoxQu4nF7EdAh8s3TwpHwrdWT6R',
};
export const JWT_TOKEN_EXPIRES = 15; // 15; // expire after 15 m // TODO: should be 15 minutes

export const REFRESH_TOKEN_EXPIRES = 60 * 24 * 30; // expire after 30 days

export const generateJwtToken = (user: any): string => {
  return jwt.sign(user, JWT_SECRET.key, {
    algorithm: JWT_SECRET.type,
    expiresIn: `${JWT_TOKEN_EXPIRES}m`,
  });
};
