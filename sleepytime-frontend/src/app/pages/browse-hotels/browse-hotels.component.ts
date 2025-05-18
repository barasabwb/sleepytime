import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HotelsService } from '../../services/hotels.service';
import { Hotel } from '../../models/hotel.model';

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
    FormsModule,
    RouterModule
  ],
  templateUrl: './browse-hotels.component.html',
  styleUrls: ['./browse-hotels.component.css']
})
export class BrowseHotelsComponent {
  searchQuery = '';
  selectedLocation: string[] = [];
  priceRange = '';
  selectedAmenities: string[] = [];
  sortOption = 'price-asc';

  limit = 12;
  page = 1;
  total = 0;

  locations: string[] = [];
  amenities: string[] = [];

  favoriteHotels: string[] = [];
  hotels: Hotel[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private hotelsService: HotelsService
  ) {}

  ngOnInit(): void {
    this.loadHotels();
    this.loadFilters();
  }

  loadHotels() {
    this.hotelsService.getHotels().subscribe(response => {
      this.hotels = response.hotels;
      this.total = response.total;
    });
  }

  loadFilters() {
    const allLocations = new Set<string>();
    const allServices = new Set<string>();

    this.hotels.forEach(hotel => {
      allLocations.add(hotel.location);
      hotel.services.forEach(service => allServices.add(service.name));
    });

    this.locations = Array.from(allLocations);
    this.amenities = Array.from(allServices);
  }

  get filteredHotels() {
    return this.hotels
      .filter(hotel => {
        const matchesSearch = !this.searchQuery ||
          hotel.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          hotel.services.some(service =>
            service.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );

        const matchesLocation = this.selectedLocation.length === 0 ||
          this.selectedLocation.some(loc => hotel.location.includes(loc));

        const minRoomPrice = this.getCheapestRoomPrice(hotel);
        let matchesPrice = true;
        if (this.priceRange) {
          if (this.priceRange === '300+') {
            matchesPrice = minRoomPrice >= 300;
          } else {
            const [min, max] = this.priceRange.split('-').map(Number);
            matchesPrice = minRoomPrice >= min && minRoomPrice <= max;
          }
        }

        const serviceNames = hotel.services.map(s => s.name);
        const matchesAmenities = this.selectedAmenities.length === 0 ||
          this.selectedAmenities.every(a => serviceNames.includes(a));

        return matchesSearch && matchesLocation && matchesPrice && matchesAmenities;
      })
      .sort((a, b) => {
        const priceA = this.getCheapestRoomPrice(a);
        const priceB = this.getCheapestRoomPrice(b);

        if (this.sortOption === 'price-asc') return priceA - priceB;
        if (this.sortOption === 'price-desc') return priceB - priceA;
        if (this.sortOption === 'name-asc') return a.name.localeCompare(b.name);
        return 0;
      });
  }

  sortHotels() {
    // Triggered by the template's (selectionChange) event
    // The actual sorting is handled in the filteredHotels getter
  }

  // Price calculation helpers
  getCheapestRoomPrice(hotel: Hotel): number {
    if (!hotel.rooms || hotel.rooms.length === 0) return 0;
    return Math.min(...hotel.rooms.map(room => room.pricePerNight));
  }

  hasDiscount(hotel: Hotel): boolean {
    return hotel.rooms?.some(room => this.getOriginalRoomPrice(room) > room.pricePerNight);
  }

  getDiscountPercentage(hotel: Hotel): number {
    const cheapestRoom = this.getCheapestRoom(hotel);
    if (!cheapestRoom) return 0;
    const original = this.getOriginalRoomPrice(cheapestRoom);
    const discount = ((original - cheapestRoom.pricePerNight) / original) * 100;
    return Math.round(discount);
  }

  getOriginalPrice(hotel: Hotel): number {
    const cheapestRoom = this.getCheapestRoom(hotel);
    return cheapestRoom ? this.getOriginalRoomPrice(cheapestRoom) : 0;
  }

  private getCheapestRoom(hotel: Hotel): any {
    if (!hotel.rooms || hotel.rooms.length === 0) return null;
    return hotel.rooms.reduce((prev, current) =>
      (prev.pricePerNight < current.pricePerNight) ? prev : current
    );
  }

  private getOriginalRoomPrice(room: any): number {
    return room.pricePerNight * 1.2; // Assuming 20% markup for original price
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
        selectedAmenities: this.selectedAmenities
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedLocation = result.selectedLocation;
        this.priceRange = result.priceRange;
        this.selectedAmenities = result.selectedAmenities;
        this.page = 1; // Reset to first page when filters change
      }
    });
  }

  clearFilters() {
    this.selectedLocation = [];
    this.priceRange = '';
    this.selectedAmenities = [];
    this.page = 1;
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
  }

  toggleFavorite(hotelId: string) {
    const index = this.favoriteHotels.indexOf(hotelId);
    if (index === -1) {
      this.favoriteHotels.push(hotelId);
    } else {
      this.favoriteHotels.splice(index, 1);
    }
  }

  isFavorite(hotelId: string): boolean {
    return this.favoriteHotels.includes(hotelId);
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
      selectedAmenities: []
    });
  }
}
