import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HotelsService } from '../../services/hotels.service';
import { Hotel } from '../../models/hotel.model';
import { MatTooltipModule } from '@angular/material/tooltip'; // Add this import
import { DatePipe } from '@angular/common'; // Add this for date pipe

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
     MatTooltipModule, // Add this module
  ],
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {
  hotel: Hotel | null = null;
  similarHotels: Hotel[] = [];
  Math = Math; // Make Math available in template

  constructor(
    private route: ActivatedRoute,
    private hotelsService: HotelsService
  ) {}

  ngOnInit(): void {
    const hotelId = this.route.snapshot.paramMap.get('id');
    if (hotelId) {
      this.loadHotelDetails(hotelId);
    }
  }

  loadHotelDetails(hotelId: string) {
    this.hotelsService.getHotelById(hotelId).subscribe(hotel => {
      this.hotel = hotel;
    });
  }


  getAmenityIcon(serviceName: string): string {
    const icons: {[key: string]: string} = {
      'Pool': 'pool',
      'Restaurant': 'restaurant',
      'Spa': 'spa',
      'Gym': 'fitness_center',
      'Bar': 'local_bar',
      'Room Service': 'room_service',
      'WiFi': 'wifi',
      'Parking': 'local_parking'
    };
    return icons[serviceName] || 'check_circle';
  }

  getCheapestRoomPrice(): number {
    if (!this.hotel?.rooms || this.hotel.rooms.length === 0) return 0;
    return Math.min(...this.hotel.rooms.map(room => room.pricePerNight));
  }

  hasDiscount(): boolean {
    if (!this.hotel?.rooms) return false;
    return this.hotel.rooms.some(room => this.getOriginalRoomPrice(room) > room.pricePerNight);
  }

  getOriginalRoomPrice(room: any): number {
    return room.pricePerNight * 1.2; // Assuming 20% markup for original price
  }

  getDiscountPercentage(): number {
    if (!this.hotel?.rooms || this.hotel.rooms.length === 0) return 0;
    const cheapestRoom = this.getCheapestRoom();
    const original = this.getOriginalRoomPrice(cheapestRoom);
    const discount = ((original - cheapestRoom.pricePerNight) / original) * 100;
    return Math.round(discount);
  }

  private getCheapestRoom(): any {
    if (!this.hotel?.rooms || this.hotel.rooms.length === 0) return null;
    return this.hotel.rooms.reduce((prev, current) =>
      (prev.pricePerNight < current.pricePerNight) ? prev : current
    );
  }
}
