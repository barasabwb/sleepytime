import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BookingStatusPipe } from '../../shared/pipes/booking-status.pipe';
import { DatePipe } from '@angular/common';

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  hotelName: string;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  status: 'confirmed' | 'cancelled' | 'pending' | 'completed';
  totalAmount: number;
  paymentMethod: string;
  specialRequests?: string;
}

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    BookingStatusPipe,
    DatePipe
  ],
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<BookingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public booking: Booking
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  print(): void {
    window.print();
  }
}
