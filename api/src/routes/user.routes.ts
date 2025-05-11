// src/routes/user.routes.ts
import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/user.controller';
import { authenticateJWT } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/admin.middleware';


const router = Router();
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
