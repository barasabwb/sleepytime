import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  topHotels = [
    {
      name: 'Grand Plaza Hotel',
      location: 'New York, USA',
      rating: 4.8,
      price: 249,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Tropical Paradise Resort',
      location: 'Bali, Indonesia',
      rating: 4.9,
      price: 189,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Mountain View Lodge',
      location: 'Swiss Alps, Switzerland',
      rating: 4.7,
      price: 320,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      comment: 'The booking process was seamless and the hotel exceeded all expectations. Will definitely use Sleepytime again!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      comment: 'Found an amazing deal on a luxury hotel through Sleepytime. Customer service was excellent throughout.',
      rating: 5
    },
    {
      name: 'Emma Williams',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      comment: 'Love how easy it is to compare hotels and prices. Saved me hours of research!',
      rating: 4
    }
  ];
}
