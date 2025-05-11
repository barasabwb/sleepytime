import { Request, Response } from 'express';
import { Booking } from '../models/booking.model';
import { Hotel } from '../models/hotel.model';
import { isDateOverlap } from '../utils/dateOverlap';

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
    const overlappingCount = await Booking.countDocuments({
    hotel: hotelId,
    'room.roomType': roomType,
    status: 'confirmed',
    $or: [
        {
        checkIn: { $lt: new Date(checkOut) },
        checkOut: { $gt: new Date(checkIn) },
        },
    ],
    });

    if (overlappingCount >= room.quantity) {
    return res
        .status(400)
        .json({ message: 'No available rooms of this type for the selected dates' });
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

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email').populate('hotel', 'name location');
    res.json({ bookings });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Failed to retrieve bookings' });
  }
};

export const getMyBookings = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  try {
    const bookings = await Booking.find({ user: userId }).populate('hotel', 'name location');
    res.json({ bookings });
  } catch (err) {
    console.error('Error fetching user bookings:', err);
    res.status(500).json({ message: 'Failed to retrieve bookings' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const isOwner = booking.user.toString() === userId;
    const isAdmin = req.user?.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ message: 'Failed to cancel booking' });
  }
};

