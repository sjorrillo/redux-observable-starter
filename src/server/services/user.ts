import { v4 as uuid } from 'uuid';
// in memory
// tables: users, roles, refetchTokens

const refreshTokens = [
  // {
  //   id: 1,
  //   userId: 1,
  //   refreshToken: 1, // uuid
  //   expiresAt: null,
  //   createdAt: null,
  // },
];

const users = [
  {
    id: uuid(),
    email: 'uno@test.com', // o username
    password: '$2a$10$GLvhp/A1IqllfsWH1KqYY.utfC.Hgkmk4TMWDxGN8VHAYzaqiXDR.', // 123
    active: true,
    roles: [],
  },
];

export const getUserByEmail = async (email: string) => {
  return users.find((it) => it.email === email);
};

export const addUser = async (_data: any) => {};

export const getRefreshToken = async (refreshToken: string) => {
  return refreshTokens.find((it) => it.refreshToken === refreshToken);
};

export const addRefreshToken = async ({ userId, refreshToken, expiresAt }) => {
  const data = {
    id: uuid(),
    userId,
    refreshToken,
    expiresAt,
    createdAt: new Date(),
  };
  refreshTokens.push(data);

  console.log('addRefreshTokenaddRefreshToken', refreshTokens);
  return data;
};

export const refreshUserToken = async ({ userId, refreshToken, expiresAt }, oldRefreshToken) => {
  const index = refreshTokens.findIndex((it) => it.refetchTokens === oldRefreshToken);
  refreshTokens.splice(index, 1);
  return addRefreshToken({ userId, refreshToken, expiresAt });
};
