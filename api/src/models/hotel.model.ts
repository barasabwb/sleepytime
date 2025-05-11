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
const RoomSchema: Schema = new Schema<IRoom>(
  {
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    maxGuests: { type: Number, required: true },
    availableDates: [
      {
        from: { type: Date, required: true },
        to: { type: Date, required: true }
      }
    ]
  },
  { _id: false }
);

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
