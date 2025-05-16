import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Hotel {
  id: number;
  name: string;
}

interface Opportunity {
  id: number;
  hotelId: number;
  startDate: Date;
  endDate: Date;
  roomsAvailable: number;
  pricePerNight: number;
}

@Component({
  selector: 'app-manage-opportunities',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './manage-opportunities.component.html',
  styleUrls: ['./manage-opportunities.component.css'],
})
export class ManageOpportunitiesComponent implements OnInit {
  hotels: Hotel[] = [
    { id: 1, name: 'Hotel Paradise' },
    { id: 2, name: 'Mountain Retreat' },
  ];

  opportunities: Opportunity[] = [
    {
      id: 1,
      hotelId: 1,
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-06-15'),
      roomsAvailable: 10,
      pricePerNight: 120,
    },
    {
      id: 2,
      hotelId: 2,
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-07-10'),
      roomsAvailable: 5,
      pricePerNight: 90,
    },
  ];

  selectedHotelId?: number;

  opportunityForm: FormGroup;

  displayedColumns = ['startDate', 'endDate', 'roomsAvailable', 'pricePerNight', 'actions'];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.opportunityForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      roomsAvailable: [0, [Validators.required, Validators.min(1)]],
      pricePerNight: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {}

  get filteredOpportunities(): Opportunity[] {
    if (!this.selectedHotelId) return [];
    return this.opportunities.filter(o => o.hotelId === this.selectedHotelId);
  }

  addOpportunity() {
    if (!this.selectedHotelId) {
      this.snackBar.open('Please select a hotel first', 'Close', { duration: 2000 });
      return;
    }
    if (this.opportunityForm.invalid) return;

    const val = this.opportunityForm.value;
    const newOpportunity: Opportunity = {
      id: this.opportunities.length + 1,
      hotelId: this.selectedHotelId,
      startDate: new Date(val.startDate),
      endDate: new Date(val.endDate),
      roomsAvailable: val.roomsAvailable,
      pricePerNight: val.pricePerNight,
    };

    if (newOpportunity.endDate < newOpportunity.startDate) {
      this.snackBar.open('End date must be after start date', 'Close', { duration: 3000 });
      return;
    }

    this.opportunities.push(newOpportunity);
    this.opportunityForm.reset();
    this.snackBar.open('Opportunity added successfully!', 'Close', { duration: 2000 });
  }

  deleteOpportunity(id: number) {
    this.opportunities = this.opportunities.filter(o => o.id !== id);
    this.snackBar.open('Opportunity deleted', 'Close', { duration: 2000 });
  }
}
