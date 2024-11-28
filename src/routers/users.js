import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  registerUsersController,
  logoutUserController,
  refreshSessionTokenController,
} from '../controllers/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/users.js';
const router = new Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUsersController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshSessionTokenController));
export default router;
