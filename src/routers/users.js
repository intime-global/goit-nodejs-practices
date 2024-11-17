import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUsersController } from "../controllers/users.js";
const router = new Router();

router.post('/register', ctrlWrapper(registerUsersController));

export default router;
