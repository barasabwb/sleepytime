import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HotelsService } from '../../services/hotels.service';
import { BookingService } from '../../services/booking.service';
import { UsersService } from '../../services/users.service';

interface StatCard {
  label: string;
  value: string;
  icon: string;
  change: number;
  trend: 'up' | 'down';
}

interface Booking {
  guest: string;
  hotel: string;
  dates: string;
  amount: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

interface QuickAction {
  label: string;
  icon: string;
  color: 'primary' | 'accent' | 'warn' | '';
}

interface HotelStat {
  bookingCount?: number;
  totalRevenue?: number;
  // add other props if any
}

interface BookingApiResponse {
  bookings: ApiBooking[];
}

interface ApiBooking {
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
  checkIn: string;  // ISO string
  checkOut: string; // ISO string
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats = signal<StatCard[]>([]);
  bookings = signal<Booking[]>([]);
  quickActions = signal<QuickAction[]>([
    { label: 'Add Hotel', icon: 'add_home', color: 'primary' },
    { label: 'Add User', icon: 'person_add', color: 'accent' },
    { label: 'Generate Report', icon: 'description', color: 'warn' },
    { label: 'Settings', icon: 'settings', color: '' }
  ]);

  displayedColumns = ['guest', 'hotel', 'dates', 'amount', 'status'];

  constructor(
    private hotelsService: HotelsService,
    private bookingService: BookingService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.loadStats();
    this.loadBookings();
  }

  loadStats() {
    this.hotelsService.getHotelStats().subscribe({
      next: (response: { stats: HotelStat[] }) => {
        const stats: HotelStat[] = response.stats || [];

        const totalBookings: number = stats.reduce(
          (sum: number, h: HotelStat) => sum + (h.bookingCount ?? 0),
          0
        ) ?? 0;
        const totalRevenue: number = stats.reduce(
          (sum: number, h: HotelStat) => sum + (h.totalRevenue ?? 0),
          0
        ) ?? 0;
        const numberOfHotels: number = stats.length ?? 0;

        // Debug logs
        console.log('Hotel stats:', stats);
        console.log('totalBookings:', totalBookings);
        console.log('totalRevenue:', totalRevenue);
        console.log('numberOfHotels:', numberOfHotels);

        this.usersService.getAllUsers().subscribe({
          next: (users) => {
            const totalUsers = users?.length ?? 0;

            // Debug logs
            console.log('Users:', users);
            console.log('totalUsers:', totalUsers);

            this.stats.set([
              {
                label: 'Total Bookings',
                value: totalBookings.toLocaleString(),
                icon: 'event_available',
                change: 0,
                trend: 'up'
              },
              {
                label: 'Total Revenue',
                value: `$${totalRevenue.toLocaleString()}`,
                icon: 'attach_money',
                change: 0,
                trend: 'up'
              },
              {
                label: 'Number of Hotels',
                value: numberOfHotels.toString(),
                icon: 'hotel',
                change: 0,
                trend: 'up'
              },
              {
                label: 'Number of Users',
                value: totalUsers.toLocaleString(),
                icon: 'people',
                change: 0,
                trend: 'up'
              }
            ]);
          },
          error: (err) => {
            console.error('Error loading users:', err);
            // fallback stats without users count
            this.stats.set([
              {
                label: 'Total Bookings',
                value: totalBookings.toLocaleString(),
                icon: 'event_available',
                change: 0,
                trend: 'up'
              },
              {
                label: 'Total Revenue',
                value: `$${totalRevenue.toLocaleString()}`,
                icon: 'attach_money',
                change: 0,
                trend: 'up'
              },
              {
                label: 'Number of Hotels',
                value: numberOfHotels.toString(),
                icon: 'hotel',
                change: 0,
                trend: 'up'
              }
            ]);
          }
        });
      },
      error: (err) => {
        console.error('Error loading stats:', err);
      }
    });
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe({
      next: (response: BookingApiResponse) => {
        const bookingsData: ApiBooking[] = response.bookings || [];
        const formattedBookings: Booking[] = bookingsData.map((b: ApiBooking) => {
          const checkInDate = new Date(b.checkIn);
          const checkOutDate = new Date(b.checkOut);

          const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
          const checkInStr = checkInDate.toLocaleDateString(undefined, options);
          const checkOutDay = checkOutDate.getDate();

          return {
            guest: b.user?.name || 'Unknown',
            hotel: b.hotel?.name || 'Unknown',
            dates: `${checkInStr} - ${checkOutDay}`,
            amount: `$${b.totalPrice.toLocaleString()}`,
            status: this.capitalizeFirstLetter(b.status || 'Pending') as 'Confirmed' | 'Pending' | 'Cancelled'
          };
        });
        this.bookings.set(formattedBookings);
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
      }
    });
  }

  refreshData() {
    this.loadStats();
    this.loadBookings();
  }

  getStatusClass(status: 'Confirmed' | 'Pending' | 'Cancelled'): string {
    switch (status) {
      case 'Confirmed':
        return 'badge-confirmed';
      case 'Pending':
        return 'badge-pending';
      case 'Cancelled':
        return 'badge-cancelled';
      default:
        return '';
    }
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
