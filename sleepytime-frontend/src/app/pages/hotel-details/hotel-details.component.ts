import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // if using Angular Material icons
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule,RouterModule],
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {
  hotelId!: string | null;
  hotel: any;

  // Simulated hotels data - replace later with API call
  hotels = [
    {
      id: '1',
      name: 'Ocean View Resort',
      description: 'A beautiful seaside resort with stunning views.',
      rating: 4.7,
      address: '123 Beach Rd, Miami',
      rooms: ['Standard', 'Deluxe', 'Suite'],
      imageUrl: 'https://images.unsplash.com/photo-1501117716987-c8e4c86fc8ae'
    },
    {
      id: '2',
      name: 'Mountain Escape',
      description: 'Cozy cabins surrounded by nature.',
      rating: 4.5,
      address: '456 Hilltop Dr, Aspen',
      rooms: ['Cabin', 'Suite'],
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.hotelId = this.route.snapshot.paramMap.get('id');
    this.hotel = this.hotels.find(h => h.id === this.hotelId);
  }
}
