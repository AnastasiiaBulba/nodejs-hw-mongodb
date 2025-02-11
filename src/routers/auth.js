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

import { requestResetEmailSchema } from '../validation/auth.js';
import { requestResetEmailController } from '../controllers/auth.js';

import { resetPasswordSchema } from '../validation/auth.js';
import { resetPasswordController } from '../controllers/auth.js';

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

// роутер для скидання паролю
router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

// router.post(
//   '/reset-password',
//   validateBody(resetPasswordSchema),
//   ctrlWrapper(resetPasswordController),
// );

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
