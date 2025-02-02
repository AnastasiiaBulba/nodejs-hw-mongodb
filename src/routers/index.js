// роутери для роботи з сонтактами і авторизацією

import { Router } from 'express';
import studentsRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();

router.use('/contacts', studentsRouter);
router.use('/auth', authRouter);

export default router;
