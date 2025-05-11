import express from 'express';
import { createBooking } from '../controllers/booking.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

// Authenticated users can book
router.post('/', authenticateJWT, createBooking);

export default router;
