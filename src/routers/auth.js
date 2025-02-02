import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  loginUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

// роутер для авторизації
const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

// роутер для logout
router.post('/logout', ctrlWrapper(logoutUserController));

// роутер для refresh
router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
