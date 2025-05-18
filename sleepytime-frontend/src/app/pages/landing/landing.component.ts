import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthModalComponent } from '../../shared/components/auth-modal/auth-modal.component';
import { AuthService } from '../../services/auth.service'; // Add this
import { HotelsService } from '../../services/hotels.service';
import { Hotel } from '../../models/hotel.model';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    AuthModalComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  @ViewChild('authModal') authModal!: AuthModalComponent;

  isAuthenticated = false;
topHotels: Hotel[] = [];
  constructor(private authService: AuthService,private hotelsService: HotelsService) {}




  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
     this.hotelsService.getTopHotels().subscribe(response => {
      this.topHotels = response.hotels;
    });
  }
 getCheapestRoomPrice(hotel: Hotel): number {
    if (!hotel.rooms || hotel.rooms.length === 0) return 0;
    return Math.min(...hotel.rooms.map(room => room.pricePerNight));
  }

  // Helper to count different room types
  getRoomTypesCount(hotel: Hotel): number {
    if (!hotel.rooms) return 0;
    return new Set(hotel.rooms.map(room => room.roomType)).size;
  }

  // Example method to determine special deals
  hasSpecialDeal(hotel: Hotel): boolean {
    // Implement your logic for special deals
    // For example, check if any room has a discount
    return hotel.rooms?.some(room =>
      room.pricePerNight < this.getOriginalPriceForRoom(room)
    ) ?? false;
  }

  // Helper to get original price (example implementation)
  private getOriginalPriceForRoom(room: any): number {
    // This would come from your backend or calculations
    return room.pricePerNight * 1.2; // Example 20% discount
  }
  openAuthModal(mode: 'login' | 'register') {
    this.authModal.openModal(mode);
  }



}
