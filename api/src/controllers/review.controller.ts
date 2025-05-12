import { Request, Response } from 'express';
import { Review } from '../models/review.model';
import { Hotel } from '../models/hotel.model';
import { User } from '../models/user.model';

// Add a review
export const addReview = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { hotelId, rating, reviewText } = req.body;

  try {
    // Check if the hotel exists
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    // Create the review
    const review = new Review({
      hotel: hotelId,
      user: userId,
      rating,
      reviewText,
    });

    await review.save();
    res.status(201).json({ message: 'Review added', review });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ message: 'Failed to add review' });
  }
};

// Get reviews for a hotel
export const getReviewsByHotel = async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId;

  try {
    const reviews = await Review.find({ hotel: hotelId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

// Delete a review (Admin or User)
export const deleteReview = async (req: Request, res: Response) => {
  const reviewId = req.params.reviewId;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const isOwner = review.user.toString() === userId;
    const isAdmin = req.user?.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await Review.deleteOne({ _id: reviewId });
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ 
      message: 'Failed to delete review',
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
};
