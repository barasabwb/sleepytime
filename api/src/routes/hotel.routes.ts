// src/routes/hotel.routes.ts
import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/admin.middleware';
import {
  createHotel,
  editHotel,
  deleteHotel,
  listHotels,
  getHotelById
} from '../controllers/hotel.controller';
const router = Router();

router.post('/', authenticateJWT, requireAdmin, createHotel);
router.put('/:id', authenticateJWT, requireAdmin, editHotel);
router.delete('/:id', authenticateJWT, requireAdmin, deleteHotel);
router.get('/:id', getHotelById);
router.get('/', listHotels);

export default router;
