import mongoose, { Schema, Document } from 'mongoose';

// Room Subdocument Interface
interface IRoom {
  roomType: string;
  pricePerNight: number;
  maxGuests: number;
  availableDates: { from: Date; to: Date }[];
}

// Hotel Document Interface
export interface IHotel extends Document {
  name: string;
  location: string;
  description: string;
  photos: string[];
  services: { name: string; description: string }[];
  rooms: IRoom[];
}

// Room Schema (subdocument)
// models/Hotel.ts (Room subdocument)

const RoomSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  maxGuests: { type: Number, required: true },
  availableDates: [
    {
      from: Date,
      to: Date,
    },
  ],
  quantity: { type: Number, required: true, default: 1 }, // 👈 new field
});


// Hotel Schema
const HotelSchema: Schema = new Schema<IHotel>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    photos: [String],
    services: [
      {
        name: { type: String, required: true },
        description: { type: String }
      }
    ],
    rooms: [RoomSchema]
  },
  { timestamps: true }
);

export const Hotel = mongoose.model<IHotel>('Hotel', HotelSchema);
