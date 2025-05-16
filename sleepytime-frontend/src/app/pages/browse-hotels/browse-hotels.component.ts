import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-browse-hotels',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './browse-hotels.component.html',
  styleUrls: ['./browse-hotels.component.css']
})
export class BrowseHotelsComponent {
  hotels = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'New York, USA',
      rating: 4.8,
      pricePerNight: 249,
      originalPrice: 299,
      discount: 17,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant'],
      topAmenities: ['Pool', 'Spa', 'Gym']
    },
    {
      id: 2,
      name: 'Tropical Paradise Resort',
      location: 'Bali, Indonesia',
      rating: 4.9,
      pricePerNight: 189,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit-crop',
      amenities: ['Free WiFi', 'Beachfront', 'Spa', 'Restaurant', 'Bar'],
      topAmenities: ['Beachfront', 'Spa', 'Bar']
    },
    {
      id: 3,
      name: 'Mountain View Lodge',
      location: 'Swiss Alps, Switzerland',
      rating: 4.7,
      pricePerNight: 320,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit-crop',
      amenities: ['Free WiFi', 'Ski-in/Ski-out', 'Spa', 'Restaurant'],
      topAmenities: ['Ski-in/Ski-out', 'Spa']
    }
  ];

  searchQuery = '';
  selectedLocation: string[] = [];
  priceRange = '';
  minRating = 1;
  selectedAmenities: string[] = [];
  sortOption = 'rating-desc';

  itemsPerPage = 12;
  currentPage = 0;

  locations = ['New York', 'Bali', 'Swiss Alps', 'Paris', 'Tokyo', 'London'];
  amenities = ['Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Beachfront', 'Ski-in/Ski-out'];

  favoriteHotels: number[] = [];

  constructor(private dialog: MatDialog, private router: Router) {}

  get filteredHotels() {
    return this.hotels
      .filter(hotel => {
        const matchesSearch = !this.searchQuery ||
          hotel.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          hotel.amenities.some(a => a.toLowerCase().includes(this.searchQuery.toLowerCase()));

        const matchesLocation = this.selectedLocation.length === 0 ||
          this.selectedLocation.some(loc => hotel.location.includes(loc));

        let matchesPrice = true;
        if (this.priceRange) {
          if (this.priceRange === '300+') {
            matchesPrice = hotel.pricePerNight >= 300;
          } else {
            const [min, max] = this.priceRange.split('-').map(Number);
            matchesPrice = hotel.pricePerNight >= min && hotel.pricePerNight <= max;
          }
        }

        const matchesRating = hotel.rating >= this.minRating;

        const matchesAmenities = this.selectedAmenities.length === 0 ||
          this.selectedAmenities.every(a => hotel.amenities.includes(a));

        return matchesSearch && matchesLocation && matchesPrice && matchesRating && matchesAmenities;
      })
      .sort((a, b) => {
        if (this.sortOption === 'price-asc') return a.pricePerNight - b.pricePerNight;
        if (this.sortOption === 'price-desc') return b.pricePerNight - a.pricePerNight;
        if (this.sortOption === 'rating-desc') return b.rating - a.rating;
        if (this.sortOption === 'name-asc') return a.name.localeCompare(b.name);
        return 0;
      })
      .slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage);
  }

  openFilters() {
    const dialogRef = this.dialog.open(FiltersDialogComponent, {
      width: '90vw',
      maxWidth: '500px',
      data: {
        locations: this.locations,
        amenities: this.amenities,
        selectedLocation: this.selectedLocation,
        priceRange: this.priceRange,
        minRating: this.minRating,
        selectedAmenities: this.selectedAmenities
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedLocation = result.selectedLocation;
        this.priceRange = result.priceRange;
        this.minRating = result.minRating;
        this.selectedAmenities = result.selectedAmenities;
        this.currentPage = 0;
      }
    });
  }

  clearFilters() {
    this.selectedLocation = [];
    this.priceRange = '';
    this.minRating = 1;
    this.selectedAmenities = [];
    this.currentPage = 0;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }

  toggleFavorite(hotel: any) {
    const index = this.favoriteHotels.indexOf(hotel.id);
    if (index === -1) {
      this.favoriteHotels.push(hotel.id);
    } else {
      this.favoriteHotels.splice(index, 1);
    }
  }

  isFavorite(hotel: any): boolean {
    return this.favoriteHotels.includes(hotel.id);
  }

  viewHotel(id: number) {
    this.router.navigate(['/hotels', id]);
  }
}

@Component({
  selector: 'app-filters-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title class="text-xl font-bold mb-4 p-6 pb-0">Filter Hotels</h2>
    <div mat-dialog-content class="p-6">
      <mat-form-field appearance="outline" class="w-full mb-4">
        <mat-label>Location</mat-label>
        <mat-select [(value)]="data.selectedLocation" multiple>
          <mat-option *ngFor="let location of data.locations" [value]="location">
            {{ location }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full mb-4">
        <mat-label>Price Range</mat-label>
        <mat-select [(value)]="data.priceRange">
          <mat-option value="0-100">$0 - $100</mat-option>
          <mat-option value="100-200">$100 - $200</mat-option>
          <mat-option value="200-300">$200 - $300</mat-option>
          <mat-option value="300+">$300+</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full mb-4">
        <mat-label>Rating</mat-label>
        <mat-select [(value)]="data.minRating">
          <mat-option value="4">4+ Stars</mat-option>
          <mat-option value="3">3+ Stars</mat-option>
          <mat-option value="2">2+ Stars</mat-option>
          <mat-option value="1">Any Rating</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Amenities</mat-label>
        <mat-select [(value)]="data.selectedAmenities" multiple>
          <mat-option *ngFor="let amenity of data.amenities" [value]="amenity">
            {{ amenity }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div mat-dialog-actions class="flex justify-end gap-2 p-4 pt-0">
      <button mat-button (click)="onClear()">Clear</button>
      <button mat-raised-button color="primary" (click)="onApply()">Apply</button>
    </div>
  `,
  styles: [`
    .mat-mdc-dialog-content {
      max-height: 65vh;
    }
  `]
})
export class FiltersDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FiltersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onApply() {
    this.dialogRef.close(this.data);
  }

  onClear() {
    this.dialogRef.close({
      selectedLocation: [],
      priceRange: '',
      minRating: 1,
      selectedAmenities: []
    });
  }
}
