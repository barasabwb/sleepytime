export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
  __v: number;
  bookings: any[]; // You can define a Booking interface if needed
}
