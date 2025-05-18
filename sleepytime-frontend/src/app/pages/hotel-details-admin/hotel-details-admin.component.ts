import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AmenityChipsComponent } from '../../shared/components/amenity-chips/amenity-chips.component';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    MatChipsModule,
    RouterModule,
    AmenityChipsComponent
  ],
  templateUrl: './hotel-details-admin.component.html',
  styleUrls: ['./hotel-details-admin.component.css']
})
export class HotelDetailsComponent {
  hotelForm: FormGroup;
  isEditMode = false;
  hotelId: string | null = null;

  // Mock amenities list - replace with API call
  allAmenities = [
    'Pool', 'Spa', 'Gym', 'Restaurant',
    'WiFi', 'Parking', 'Air Conditioning',
    'Breakfast', 'Bar', 'Room Service'
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      amenities: [[]],
      images: [[]]
    });

    this.route.paramMap.subscribe(params => {
      this.hotelId = params.get('id');
      this.isEditMode = !!this.hotelId;
      this.loadHotelData();
    });
  }

  loadHotelData(): void {
    if (!this.isEditMode) return;

    // Mock data - replace with API call
    const mockHotel = {
      id: this.hotelId,
      name: 'Grand Plaza Hotel',
      location: 'New York',
      description: 'Luxury hotel with central park views',
      rating: 4.5,
      amenities: ['Pool', 'Spa', 'Restaurant'],
      images: []
    };

    this.hotelForm.patchValue(mockHotel);
  }

  onSubmit(): void {
    if (this.hotelForm.invalid) {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 2000 });
      return;
    }

    const action = this.isEditMode ? 'updated' : 'created';
    this.snackBar.open(`Hotel ${action} successfully!`, 'Close', { duration: 2000 });
    this.router.navigate(['/admin/hotels']);
  }

  onImageUpload(event: any): void {
    // Handle image upload logic
    console.log('Images selected:', event.target.files);
  }
}
