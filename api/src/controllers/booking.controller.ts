import { Request, Response } from 'express';
import { Booking } from '../models/booking.model';
import { Hotel } from '../models/hotel.model';

export const createBooking = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
 

  const { hotelId, roomType, checkIn, checkOut } = req.body;

  try {
    // Validate hotel and room
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    const room = hotel.rooms.find(r => r.roomType === roomType);
    if (!room) return res.status(404).json({ message: 'Room type not found' });

    // Calculate days and total price
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      return res.status(400).json({ message: 'Invalid check-in/check-out dates' });
    }

    const totalPrice = nights * room.pricePerNight;

    // Create booking
    const newBooking = new Booking({
      user: userId,
      hotel: hotel._id,
      room: {
        roomType: room.roomType,
        pricePerNight: room.pricePerNight,
        maxGuests: room.maxGuests
      },
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice,
      status: 'confirmed'
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking confirmed', booking: newBooking });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Failed to create booking' });
  }
};
