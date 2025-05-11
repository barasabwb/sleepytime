import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  hotel: mongoose.Types.ObjectId;
  room: {
    roomType: string;
    pricePerNight: number;
    maxGuests: number;
  };
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
}

const BookingSchema = new Schema<IBooking>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
  room: {
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    maxGuests: { type: Number, required: true }
  },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
}, { timestamps: true });

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
