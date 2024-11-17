import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUsersController } from '../controllers/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/users.js';
const router = new Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUsersController),
);

export default router;
