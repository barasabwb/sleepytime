import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

interface Review {
  id: string;
  hotelName: string;
  guestName: string;
  rating: number;
  comment: string;
  date: Date;
  status: 'published' | 'pending' | 'rejected';
}

@Component({
  selector: 'app-reviews-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatChipsModule,
    MatMenuModule,
    RouterModule,
    MatDividerModule
  ],
  templateUrl: './reviews-management.component.html',
  styleUrls: ['./reviews-management.component.css']
})
export class ReviewsManagementComponent {
  displayedColumns: string[] = ['hotel', 'guest', 'rating', 'comment', 'date', 'status', 'actions'];
  reviews: Review[] = [
    {
      id: '1',
      hotelName: 'Grand Plaza Hotel',
      guestName: 'John Smith',
      rating: 5,
      comment: 'Excellent service and beautiful rooms!',
      date: new Date('2023-06-10'),
      status: 'published'
    },
    {
      id: '2',
      hotelName: 'Beachside Resort',
      guestName: 'Emma Johnson',
      rating: 4,
      comment: 'Great location but the food could be better',
      date: new Date('2023-06-05'),
      status: 'published'
    },
    {
      id: '3',
      hotelName: 'Mountain Lodge',
      guestName: 'Michael Brown',
      rating: 3,
      comment: 'Needs renovation but friendly staff',
      date: new Date('2023-05-28'),
      status: 'pending'
    }
  ];

  // Pagination
  pageSize = 5;
  pageIndex = 0;
  totalReviews = 15; // Mock total

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // In real app: this.loadReviews();
  }

  updateReviewStatus(id: string, newStatus: Review['status']): void {
    const review = this.reviews.find(r => r.id === id);
    if (review) {
      review.status = newStatus;
      // In real app: call API to update status
    }
  }

  deleteReview(id: string): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviews = this.reviews.filter(r => r.id !== id);
      // In real app: call API to delete
    }
  }
}
