// src/app/models/booking.model.ts

export interface ApiBooking {
  room: {
    roomType: string;
    pricePerNight: number;
    maxGuests: number;
  };
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  hotel: {
    _id: string;
    name: string;
    location: string;
  };
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BookingApiResponse {
  bookings: ApiBooking[];
}


export interface ApiRoom {
  roomType: string;
  pricePerNight: number;
  maxGuests: number;
}

export interface ApiUser {
  _id: string;
  name: string;
  email: string;
}

export interface ApiHotel {
  _id: string;
  name: string;
  location: string;
}



export interface SingleBookingApiResponse {
  booking: ApiBooking;
}
