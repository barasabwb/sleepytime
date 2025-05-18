import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BookingStatusPipe } from '../../shared/pipes/booking-status.pipe';
import { DatePipe } from '@angular/common';

interface Booking {
  _id: string;
  user?: {
    name: string;
    email: string;
  };
  hotel?: {
    name: string;
  };
  room?: {
    roomType: string;
  };
  checkIn: string | Date;
  checkOut: string | Date;
  status: 'confirmed' | 'cancelled' | 'pending' | 'completed';
  totalPrice: number;       // matching your actual API
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

 getNights(checkIn: string | Date, checkOut: string | Date): number {
  const inDate = typeof checkIn === 'string' ? new Date(checkIn) : checkIn;
  const outDate = typeof checkOut === 'string' ? new Date(checkOut) : checkOut;
  const diffTime = Math.abs(outDate.getTime() - inDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}


  print(): void {
    window.print();
  }
}
