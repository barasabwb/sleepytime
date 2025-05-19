import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BookingDetailsComponent } from '../../pages/booking-details/booking-details.component';
import { AuthService } from '../../services/auth.service'; // Adjust path if needed

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
    RouterModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class UserDashboardComponent {
  activeTabIndex = signal(0);

  // Reactive booking list (fetched from the API)
  bookings = signal<any[]>([]);


  constructor(private bookingService: BookingService,private dialog: MatDialog,private snackBar: MatSnackBar, private authService: AuthService) {
    this.fetchBookings();
  }
    user: any;

  ngOnInit(): void {
    this.user = this.authService.getUser().user;

  }

  fetchBookings() {
   this.bookingService.getMyBookings().subscribe({
      next: (res) => {
        this.bookings.set(res.bookings);
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
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
          this.fetchBookings(); // Refresh the list
        },
        error: (err) => {
          console.error('Cancel failed:', err);
          this.snackBar.open('Failed to cancel booking.', 'Close', { duration: 3000 });
        }
      });
    }

  // Stub favorites and recommendations for now
  favorites = signal<Hotel[]>([]);
  recommendations = signal<Hotel[]>([]);

  onTabChange(index: number) {
    this.activeTabIndex.set(index);
  }


}
