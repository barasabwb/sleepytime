import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../../services/hotels.service';
import { Hotel } from '../../models/hotel.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

// Import your dialog component here - adjust the path accordingly
import { AddHotelDialogComponent } from './add-hotel-dialog/add-hotel-dialog.component';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatTooltipModule,
    RouterModule,
    MatDialogModule,
    ReactiveFormsModule,
    AddHotelDialogComponent, // add the dialog component here
  ],
  templateUrl: './manage-hotels.component.html',
  styleUrls: ['./manage-hotels.component.css'],
})
export class ManageHotelsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'location', 'actions'];
  hotels: Hotel[] = [];
  loading = false;

  constructor(
    private hotelsService: HotelsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchHotels();
  }

  fetchHotels(): void {
    this.loading = true;
    this.hotelsService.getHotels().subscribe({
      next: (response) => {
        this.hotels = response.hotels;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching hotels:', err);
        this.snackBar.open('Failed to load hotels', 'Close', { duration: 3000 });
        this.loading = false;
      },
    });
  }

  getServiceNames(services: any[]): string {
    if (!services || services.length === 0) return 'No services';
    return services.map(s => s.name).join(', ');
  }

  deleteHotel(id: string): void {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.hotelsService.deleteHotel(id).subscribe({
        next: () => {
          this.hotels = this.hotels.filter(h => h._id !== id);
          this.snackBar.open('Hotel deleted successfully', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Delete failed:', err);
          this.snackBar.open('Failed to delete hotel', 'Close', { duration: 3000 });
        }
      });
    }
  }

  // Open the Add Hotel dialog
  openAddHotelModal(): void {
    const dialogRef = this.dialog.open(AddHotelDialogComponent, {
      width: '600px',
      maxHeight: '80vh',  // allow dialog to be at most 80% viewport height
  });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // result is the new hotel data from the dialog form
        this.hotelsService.addHotel(result).subscribe({
          next: () => {
            this.snackBar.open('Hotel added successfully', 'Close', { duration: 3000 });
            this.fetchHotels(); // refresh the list
          },
          error: (err) => {
            console.error('Add hotel failed:', err);
            this.snackBar.open('Failed to add hotel', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
