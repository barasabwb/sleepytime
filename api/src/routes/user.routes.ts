// src/routes/user.routes.ts
import { Router } from 'express';
import { loginUser, registerUser} from '../controllers/user.controller';
import { getUserProfile, updateUserProfile , getAllUsers} from '../controllers/user.controller';
import { authenticateJWT } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/admin.middleware';


const router = Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateJWT, getUserProfile);
router.put('/profile', authenticateJWT, updateUserProfile);
router.get('/getAllUsers', authenticateJWT, requireAdmin, getAllUsers);

export default router;
