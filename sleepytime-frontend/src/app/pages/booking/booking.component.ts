import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BookingService } from '../../services/booking.service';
import { HotelsService } from '../../services/hotels.service';
import { Hotel } from '../../models/hotel.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';  // module for imports
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service'; // Add this

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDividerModule,
    DatePipe,
    MatSnackBarModule
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  hotel: Hotel | null = null;
  roomTypes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private hotelService: HotelsService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.bookingForm = this.fb.group({

      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]],
      roomType: ['', Validators.required],
      specialRequests: ['']
    });
  }

  ngOnInit(): void {
    const hotelId = this.route.snapshot.queryParamMap.get('hotelId');
    const roomId = this.route.snapshot.queryParamMap.get('roomId');

    if (hotelId) {
      this.hotelService.getHotelById(hotelId).subscribe(hotel => {
        this.hotel = hotel;
        this.roomTypes = hotel.rooms.map((room: any) => room.roomType);


        if (roomId) {
          const selectedRoom = hotel.rooms.find((room: any) => room._id === roomId);
          if (selectedRoom) {
            this.bookingForm.patchValue({
              roomType: selectedRoom.roomType
            });
          }
        }
      });
    }
  }

  get totalNights(): number {
    if (!this.bookingForm.value.checkIn || !this.bookingForm.value.checkOut) {
      return 0;
    }
    const checkIn = new Date(this.bookingForm.value.checkIn);
    const checkOut = new Date(this.bookingForm.value.checkOut);
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  get totalCost(): number {
    if (!this.hotel || !this.bookingForm.value.roomType) return 0;

    const selectedRoom = this.hotel.rooms.find(
      room => room.roomType === this.bookingForm.value.roomType
    );

    if (!selectedRoom) return 0;

    return this.totalNights * selectedRoom.pricePerNight * this.bookingForm.value.guests;
  }

  onSubmit(): void {
    if (this.bookingForm.invalid || !this.hotel) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const bookingData = {
      hotelId: this.hotel._id,
      roomType: this.bookingForm.value.roomType,
      checkIn: this.bookingForm.value.checkIn,
      checkOut: this.bookingForm.value.checkOut,
      guests: this.bookingForm.value.guests,

    };

    this.bookingService.createBooking(bookingData).subscribe({
      next: (response) => {
        this.snackBar.open('Booking successful! 🎉', 'Close', { duration: 3000 });
        const userRole = this.authService.getUserRole(); // implement this method

        setTimeout(() => {
          if (userRole === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/user/dashboard']);
          }
        }, 500);
      },
      error: (err) => {
        console.error('Booking failed:', err);
        const errMsg = err.error?.message || 'Booking failed. Please try again.';
      this.snackBar.open(errMsg, 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      }
    });
  }
}
