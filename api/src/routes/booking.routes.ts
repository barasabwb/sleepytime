import express from 'express';
import { createBooking } from '../controllers/booking.controller';
import { authenticateJWT } from '../middleware/auth.middleware';
import { getAllBookings } from '../controllers/booking.controller';
import { requireAdmin } from '../middleware/admin.middleware';
import { getMyBookings } from '../controllers/booking.controller';
import { cancelBooking } from '../controllers/booking.controller';



const router = express.Router();

// Authenticated users can book
router.post('/', authenticateJWT, createBooking);
router.get('/', authenticateJWT, requireAdmin, getAllBookings);
router.get('/my', authenticateJWT, getMyBookings);

router.put('/:id/cancel', authenticateJWT, cancelBooking);


export default router;
