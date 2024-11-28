import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/user.js';
import { throws } from 'assert';

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

  const session = await SessionCollection.create({
    userId: user._id,
    ...newSession,
  });

  return session;
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({
    _id: sessionId,
  });
};

export const refreshSessionToken = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) throw createHttpError(401, 'Session not found');

  if (new Date() > new Date(session.refreshTokenValidUntil))
    throw createHttpError(401, 'refreshtoken is expired');

  await SessionCollection.findOneAndDelete({ _id: sessionId, refreshToken });
  const newSession = setupSession();

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
