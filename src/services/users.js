import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/user.js';

export const registerUser = async (payload) => {
  const { name, email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) throw createHttpError(409, 'Email in use');
  const hashedPassword = await bcrypt.hash(password, 10);
  return await UserCollection.create({ ...payload, password: hashedPassword });
};

/**
  |============================
  | new session function
  |============================
*/
const setupSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  };
};

/**
  |============================
  | login user
  |============================
*/
export const loginUser = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });

  if (!user) throw createHttpError(401, 'Email or password invalid');

  const isEqual = await bcrypt.compare(password, user.password);

  if (!isEqual) throw createHttpError(401, 'Email or password invalid');

  await SessionCollection.findOneAndDelete({ userId: user._id });

  const newSession = setupSession();

  return {
    userId: user._id,
    ...newSession,
  };
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({
    _id: sessionId,
  });
};
