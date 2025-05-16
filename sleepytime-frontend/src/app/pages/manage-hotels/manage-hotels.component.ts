import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-manage-hotels',
  standalone: true,
  templateUrl: './manage-hotels.component.html',
  styleUrls: ['./manage-hotels.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class ManageHotelsComponent {
  hotelForm!: FormGroup;
  hotels: { id: number; name: string; location: string; rating: number }[] = [];
  nextId = 1;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]]
    });
  }

  addHotel(): void {
    if (this.hotelForm.invalid) return;

    const newHotel = {
      id: this.nextId++,
      ...this.hotelForm.value
    };

    this.hotels.push(newHotel);
    this.hotelForm.reset({ rating: 0 });
    this.snackBar.open('Hotel added successfully!', 'Close', { duration: 2000 });
  }

  deleteHotel(id: number): void {
    this.hotels = this.hotels.filter(h => h.id !== id);
    this.snackBar.open('Hotel deleted.', 'Close', { duration: 2000 });
  }
}
