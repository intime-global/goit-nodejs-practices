import { loginUser, registerUser, logoutUser, refreshSessionToken } from '../services/users.js';

export const registerUsersController = async (req, res, next) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

const setCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    expires: session.refreshTokenValidUntil,
    httpOnly: true,
  });

  res.cookie('refreshToken', session.refreshToken, {
    expires: session.refreshTokenValidUntil,
    httpOnly: true,
  });
};

/**
  |============================
  | login user controller
  |============================
*/

export const loginUserController = async (req, res) => {
  const newSession = await loginUser(req.body);

  setCookies(res, newSession);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: newSession.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};

export const refreshSessionTokenController = async (req, res) => {

  const session = await refreshSessionToken({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken
  });

  setCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });

};
