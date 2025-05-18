import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BookingService } from '../../services/booking.service';
import { NgIf, NgFor, DatePipe, TitleCasePipe, NgClass } from '@angular/common';
import { BookingDetailsComponent } from '../booking-details/booking-details.component';

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    NgClass,
    DatePipe,
    TitleCasePipe,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    BookingDetailsComponent,
  ],
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent implements OnInit {
  bookings: any[] = [];
  displayedColumns: string[] = ['hotel', 'user', 'checkIn', 'checkOut', 'totalPrice', 'status', 'actions'];
  loading = false;

  constructor(
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.bookingService.getBookings().subscribe({
      next: (res) => {
        this.bookings = res.bookings;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
        this.snackBar.open('Failed to load bookings.', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }



  viewBookingDetails(bookingId: string): void {
  this.bookingService.getBookingById(bookingId).subscribe({
    next: (res) => {
      const bookingDetails = res.booking; // adjust based on your API response structure
      this.dialog.open(BookingDetailsComponent, {
        width: '800px',
        data: bookingDetails
      });
    },
    error: (err) => {
      console.error('Failed to load booking details', err);
      this.snackBar.open('Failed to load booking details.', 'Close', { duration: 3000 });
    }
  });
}


  cancelBooking(bookingId: string): void {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    this.bookingService.cancelBooking(bookingId).subscribe({
      next: () => {
        this.snackBar.open('Booking cancelled successfully.', 'Close', { duration: 3000 });
        this.loadBookings(); // Refresh the list
      },
      error: (err) => {
        console.error('Cancel failed:', err);
        this.snackBar.open('Failed to cancel booking.', 'Close', { duration: 3000 });
      }
    });
  }
}
