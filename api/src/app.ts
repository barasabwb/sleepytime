// src/app.ts
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import hotelRoutes from './routes/hotel.routes';
import bookingRoutes from './routes/booking.routes';
import reviewRoutes from './routes/review.routes';



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('SleepyTime API is running');
});

app.use('/api/reviews', reviewRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/users/register', userRoutes);
app.use('/api/bookings', bookingRoutes);
export default app;
