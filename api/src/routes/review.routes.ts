import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware';
import { addReview, getReviewsByHotel, deleteReview } from '../controllers/review.controller';

const router = Router();

// Add a review
router.post('/', authenticateJWT, addReview);

// Get reviews for a hotel
router.get('/:hotelId', getReviewsByHotel);

// Delete a review
router.delete('/:reviewId', authenticateJWT, deleteReview);

export default router;
