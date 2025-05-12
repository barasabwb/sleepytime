// src/routes/hotel.routes.ts
import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/admin.middleware';
import {
  createHotel,
  editHotel,
  deleteHotel,
  listHotels,
  getHotelById,
  getHotelStats
} from '../controllers/hotel.controller';
const router = Router();

router.post('/', authenticateJWT, requireAdmin, createHotel);
router.put('/hotel/:id', authenticateJWT, requireAdmin, editHotel);
router.delete('/hotel/:id', authenticateJWT, requireAdmin, deleteHotel);
router.get('/hotel/:id', getHotelById);
router.get('/', listHotels);
router.get('/hotel-stats', authenticateJWT, requireAdmin, getHotelStats);

export default router;
