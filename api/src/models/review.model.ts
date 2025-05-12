import { Schema, model, Document } from 'mongoose';

export interface IReview extends Document {
  hotel: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  rating: number;
  reviewText: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>({
  hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
}, { timestamps: true });

export const Review = model<IReview>('Review', reviewSchema);
