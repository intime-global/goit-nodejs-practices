import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { logoutUserController, registerUsersController } from '../controllers/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/users.js';
const router = new Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUsersController),
);
router.post('/logout',
  ctrlWrapper(logoutUserController)
);
export default router;
