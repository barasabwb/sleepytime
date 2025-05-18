import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

interface Booking {
  id: string;
  hotel: string;
  image: string;
  dates: string;
  guests: number;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  price: number;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class UserDashboardComponent {
  activeTabIndex = signal(0); // 0=Bookings, 1=Favorites, 2=Recommendations

  user = signal({
    name: 'Alex Johnson',
    membership: 'Gold Member',
    avatar: '/assets/user-avatar.jpg'
  });

  bookings = signal<Booking[]>([
    {
      id: '1',
      hotel: 'Grand Plaza',
      image: '/assets/hotel-1.jpg',
      dates: 'Jun 15-20, 2023',
      guests: 2,
      price: 1250,
      status: 'upcoming'
    },
    {
      id: '2',
      hotel: 'Beach Resort',
      image: '/assets/hotel-2.jpg',
      dates: 'May 10-15, 2023',
      guests: 4,
      price: 980,
      status: 'completed'
    },
    {
      id: '3',
      hotel: 'Mountain Lodge',
      image: '/assets/hotel-3.jpg',
      dates: 'Jul 5-12, 2023',
      guests: 2,
      price: 1750,
      status: 'upcoming'
    }
  ]);

  favorites = signal<Hotel[]>([
    {
      id: '4',
      name: 'City Central',
      location: 'New York, NY',
      image: '/assets/hotel-4.jpg',
      rating: 4.5,
      price: 320
    },
    {
      id: '5',
      name: 'Lakeside Retreat',
      location: 'Lake Tahoe, CA',
      image: '/assets/hotel-5.jpg',
      rating: 4.8,
      price: 420
    }
  ]);

  recommendations = signal<Hotel[]>([
    {
      id: '6',
      name: 'Desert Oasis',
      location: 'Phoenix, AZ',
      image: '/assets/hotel-6.jpg',
      rating: 4.3,
      price: 280
    },
    {
      id: '7',
      name: 'Historic Inn',
      location: 'Boston, MA',
      image: '/assets/hotel-7.jpg',
      rating: 4.6,
      price: 380
    }
  ]);

  onTabChange(index: number) {
    this.activeTabIndex.set(index);
  }

  getStatusColor(status: Booking['status']) {
    return {
      upcoming: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }[status];
  }

  cancelBooking(id: string) {
    this.bookings.update(bookings =>
      bookings.map(booking =>
        booking.id === id ? { ...booking, status: 'cancelled' } : booking
      )
    );
  }
}
