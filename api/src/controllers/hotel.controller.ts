import { Request, Response } from 'express';
import { Hotel } from '../models/hotel.model';
import { Booking } from '../models/booking.model';


export const createHotel = async (req: Request, res: Response) => {
  const { name, location, description, photos, services, rooms } = req.body;

  try {
    const newHotel = new Hotel({
      name,
      location,
      description,
      photos,
      services,
      rooms
    });

    await newHotel.save();

    res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
  } catch (err) {
    console.error('Create hotel error:', err);
    res.status(500).json({ message: 'Error creating hotel' });
  }
};

// Edit hotel by ID
export const editHotel = async (req: Request, res: Response) => {
  const hotelId = req.params.id;
  const updates = req.body;

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, updates, { new: true });
    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel updated successfully', hotel: updatedHotel });
  } catch (err) {
    console.error('Error updating hotel:', err);
    res.status(500).json({ message: 'Failed to update hotel' });
  }
};

// Delete hotel by ID
export const deleteHotel = async (req: Request, res: Response) => {
  const hotelId = req.params.id;

  try {
    const deleted = await Hotel.findByIdAndDelete(hotelId);
    if (!deleted) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    console.error('Error deleting hotel:', err);
    res.status(500).json({ message: 'Failed to delete hotel' });
  }
};

export const listHotels = async (req: Request, res: Response) => {
  const {
    location,
    name,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    sortBy = 'name',
    sortOrder = 'asc'
  } = req.query;

  const filter: any = {};

  if (location) {
    filter.location = { $regex: new RegExp(location as string, 'i') };
  }

  if (name) {
    filter.name = { $regex: new RegExp(name as string, 'i') };
  }

  if (minPrice || maxPrice) {
    filter['rooms.pricePerNight'] = {};
    if (minPrice) {
      filter['rooms.pricePerNight'].$gte = parseFloat(minPrice as string);
    }
    if (maxPrice) {
      filter['rooms.pricePerNight'].$lte = parseFloat(maxPrice as string);
    }
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortDirection = sortOrder === 'desc' ? -1 : 1;

  const sort: any = {};
  if (['name', 'location'].includes(sortBy as string)) {
    sort[sortBy as string] = sortDirection;
  } else if (sortBy === 'price') {
    sort['rooms.pricePerNight'] = sortDirection;
  }

  try {
    const hotels = await Hotel.find(filter).sort(sort).skip(skip).limit(Number(limit));
    const total = await Hotel.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      hotels
    });
  } catch (err) {
    console.error('Error listing hotels:', err);
    res.status(500).json({ message: 'Failed to retrieve hotels' });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  const hotelId = req.params.id;

  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (err) {
    console.error('Error retrieving hotel:', err);
    res.status(500).json({ message: 'Failed to retrieve hotel' });
  }
};


export const getHotelStats = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find();

    const stats = await Promise.all(
      hotels.map(async (hotel) => {
        const bookingCount = await Booking.countDocuments({ hotel: hotel._id, status: 'confirmed' });
        const totalRevenue = await Booking.aggregate([
          { $match: { hotel: hotel._id, status: 'confirmed' } },
          { $group: { _id: null, total: { $sum: '$totalPrice' } } },
        ]);
        return {
          hotelName: hotel.name,
          location: hotel.location,
          bookingCount,
          totalRevenue: totalRevenue[0]?.total || 0,
        };
      })
    );

    res.json({ stats });
  } catch (err) {
    console.error('Error fetching hotel stats:', err);
    res.status(500).json({ message: 'Failed to fetch hotel stats' });
  }
};

