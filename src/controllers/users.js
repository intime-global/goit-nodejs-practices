import { THERTY_DAY } from '../constants/user.js';
import { logoutUser, registerUser } from '../services/users.js';

export const registerUsersController = async (req, res, next) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  };
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THERTY_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THERTY_DAY),
  });
};
