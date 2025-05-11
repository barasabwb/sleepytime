// src/models/user.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  bookings: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
