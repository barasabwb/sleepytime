import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { BookingStatusPipe } from '../../shared/pipes/booking-status.pipe';
import { MatDialog } from '@angular/material/dialog';
import { BookingDetailsComponent } from '../booking-details/booking-details.component';

// Add to component class

interface Booking {
  id: string;
  guestName: string;
  hotelName: string;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  status: 'confirmed' | 'cancelled' | 'pending' | 'completed';
  totalAmount: number;
}

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatMenuModule,
    RouterModule,
    BookingStatusPipe
  ],
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent {
  constructor(private dialog: MatDialog) {}

viewBookingDetails(booking: Booking): void {
  this.dialog.open(BookingDetailsComponent, {
    width: '800px',
    data: {
      ...booking,
      // Mock additional details
      guestEmail: 'guest@example.com',
      guestPhone: '+1 (555) 123-4567',
      paymentMethod: 'Credit Card',
      specialRequests: 'Please provide extra towels and a late checkout if possible.'
    }
  });
}
  displayedColumns: string[] = [
    'bookingId',
    'guest',
    'hotel',
    'dates',
    'amount',
    'status',
    'actions'
  ];

  bookings: Booking[] = [
    {
      id: 'BK-1001',
      guestName: 'John Smith',
      hotelName: 'Grand Plaza',
      roomType: 'Deluxe Suite',
      checkIn: new Date('2023-06-15'),
      checkOut: new Date('2023-06-20'),
      status: 'confirmed',
      totalAmount: 1250
    },
    {
      id: 'BK-1002',
      guestName: 'Emma Johnson',
      hotelName: 'Beach Resort',
      roomType: 'Ocean View',
      checkIn: new Date('2023-06-18'),
      checkOut: new Date('2023-06-25'),
      status: 'pending',
      totalAmount: 980
    },
    {
      id: 'BK-1003',
      guestName: 'Michael Brown',
      hotelName: 'Mountain Lodge',
      roomType: 'Premium Cabin',
      checkIn: new Date('2023-07-01'),
      checkOut: new Date('2023-07-07'),
      status: 'completed',
      totalAmount: 1750
    }
  ];

  // Pagination
  pageSize = 5;
  pageIndex = 0;
  totalBookings = 20; // Mock total

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // In real app: this.loadBookings();
  }

  cancelBooking(id: string): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      // API call would go here
      const booking = this.bookings.find(b => b.id === id);
      if (booking) booking.status = 'cancelled';
    }
  }
}
