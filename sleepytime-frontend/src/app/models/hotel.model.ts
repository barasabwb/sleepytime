// src/app/models/hotel.model.ts

export interface AvailableDate {
  _id: string;
  from: string; // ISO date string
  to: string;   // ISO date string
}

export interface Room {
  _id: string;
  roomType: string;
  pricePerNight: number;
  maxGuests: number;
  quantity: number;
  availableDates: AvailableDate[];
}

export interface Service {
  _id: string;
  name: string;
  description: string;
}

export interface Hotel {
  _id: string;
  name: string;
  location: string;
  description: string;
  photos: string[];
  services: Service[];
  rooms: Room[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface HotelResponse {
  total: number;
  page: number;
  limit: number;
  hotels: Hotel[];
}
