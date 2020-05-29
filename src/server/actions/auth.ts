import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import { LoginSchema } from '../../common/schemas';
import { validateSchema } from '../../common/utils/validations';
import Errors from '../common/errors';
import {
  generateJwtToken,
  JWT_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} from '../common/security/tokens';
import {
  addRefreshToken,
  addUser,
  getRefreshToken,
  getUserByEmail,
  refreshUserToken,
} from '../services/user';

export const logout = async (_req, res) => {
  res.cookie('refresh_token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.send('OK');
};

export const login = async (req, res, _next) => {
  const validation = await validateSchema(req.body, LoginSchema);

  if (validation) {
    Errors.badRequest(validation.errors[0]);
  }

  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  // see if password hashes matches
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    Errors.unauthorized("Invalid 'username' or 'password'");
  }

  const jwtToken = generateJwtToken(user);
  const jwtTokenExpiry = new Date(new Date().getTime() + JWT_TOKEN_EXPIRES * 60 * 1000);

  // generate refresh token and put in database
  const refreshToken = uuid();

  // generate refresh token and put in database
  await addRefreshToken({
    userId: user.id,
    refreshToken,
    expiresAt: new Date(new Date().getTime() + REFRESH_TOKEN_EXPIRES * 60 * 1000), // convert from minutes to milli seconds
  });

  res.cookie('refresh_token', refreshToken, {
    maxAge: REFRESH_TOKEN_EXPIRES * 60 * 1000, // convert from minute to milliseconds
    httpOnly: true,
    secure: false,
  });

  // return jwt token and refresh token to client
  res.json({
    jwtToken,
    refreshToken,
    jwtTokenExpiry,
    user: { id: user.id },
  });
};

export const register = async (req, res) => {
  const validation = await validateSchema(req.body, LoginSchema);

  if (validation) {
    Errors.badRequest(validation.errors[0]);
  }

  const { email, password } = req.body;

  // generate password_hash
  let passwordHash = '';
  try {
    passwordHash = await bcrypt.hash(password, 10);
  } catch (e) {
    console.error(e);
    Errors.badImplementation("Unable to generate 'password hash'");
  }

  try {
    await addUser({
      email,
      password: passwordHash,
      active: true,
    });
  } catch (e) {
    const isDuplicateError = false;
    if (isDuplicateError) {
      Errors.badRequest('User already exist');
    }
    Errors.badImplementation('Unable to create user.');
  }

  res.send('OK');
};

export const refreshToken = async (req, res) => {
  // validate username and password

  const refreshToken = req.cookies['refresh_token'];
  console.log('refreshTokenrefreshTokenrefreshToken', req.cookies, refreshToken);

  // get token by refreshtoken

  const { userId } = await getRefreshToken(refreshToken);

  const newRefreshToken = uuid();
  await refreshUserToken(
    {
      userId,
      refreshToken: newRefreshToken,
      expiresAt: new Date(new Date().getTime() + REFRESH_TOKEN_EXPIRES * 60 * 1000), // convert from minutes to milli seconds
    },
    refreshToken
  );

  // generate new jwt token
  const jwtToken = generateJwtToken({ id: userId });
  const jwtTokenExpiry = new Date(new Date().getTime() + JWT_TOKEN_EXPIRES * 60 * 1000);

  res.cookie('refresh_token', newRefreshToken, {
    maxAge: REFRESH_TOKEN_EXPIRES * 60 * 1000, // convert from minute to milliseconds
    httpOnly: true,
    secure: false,
  });

  res.json({
    jwtToken,
    jwtTokenExpiry,
    refreshToken: newRefreshToken,
    refreshTokenExpiry: REFRESH_TOKEN_EXPIRES * 60 * 1000,
    user: { id: userId },
  });
};
