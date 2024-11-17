import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';

// registerUser
export const registerUser = async (payload) => {
  const { name, email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) throw createHttpError(409, 'Email in use');
  const hashedPassword = await bcrypt.hash(password, 10);
  return await UserCollection.create({ ...payload, password: hashedPassword });
};
