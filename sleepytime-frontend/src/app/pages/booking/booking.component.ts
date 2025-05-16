import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);

  bookingForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
    guests: [1, [Validators.required, Validators.min(1)]],
    roomType: ['standard', Validators.required]
  });

  roomPrices: Record<string, number> = {
    standard: 100,
    deluxe: 180,
    suite: 250
  };

  get totalNights(): number {
    const { checkIn, checkOut } = this.bookingForm.value;
    if (!checkIn || !checkOut) return 0;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = Math.ceil((outDate.getTime() - inDate.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 0;
  }

  get totalCost(): number {
    const roomType = this.bookingForm.value.roomType;
    const guests = this.bookingForm.value.guests;
    const basePrice = this.roomPrices[roomType] || 0;
    return this.totalNights * basePrice * guests;
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.snackBar.open('Please fill all required fields correctly.', 'Close', {
        duration: 3000
      });
      return;
    }

    this.snackBar.open('Booking successful!', 'Close', {
      duration: 3000
    });

    // You could forward the data to a backend service here
    this.bookingForm.reset();
  }
}
