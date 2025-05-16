import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTableModule,
    RouterLink
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  summaryStats = [
    { label: 'Total Bookings', value: '1,248', icon: 'bookmark', color: 'bg-gradient-to-r from-indigo-500 to-purple-600', progress: 75 },
    { label: 'Active Users', value: '563', icon: 'people', color: 'bg-gradient-to-r from-blue-500 to-cyan-500', progress: 45 },
    { label: 'Hotels Listed', value: '89', icon: 'hotel', color: 'bg-gradient-to-r from-green-500 to-emerald-500', progress: 60 },
    { label: 'Revenue', value: '$42,890', icon: 'attach_money', color: 'bg-gradient-to-r from-amber-500 to-orange-500', progress: 82 }
  ];

  displayedColumns: string[] = ['user', 'hotel', 'date', 'amount', 'status'];
  latestBookings = [
    { user: 'Alex Johnson', hotel: 'Grand Plaza', date: '2023-06-15', amount: '$320', status: 'Confirmed' },
    { user: 'Maria Garcia', hotel: 'Seaside Resort', date: '2023-06-14', amount: '$275', status: 'Pending' },
    { user: 'James Wilson', hotel: 'Mountain View', date: '2023-06-13', amount: '$410', status: 'Confirmed' },
    { user: 'Sarah Lee', hotel: 'Urban Suites', date: '2023-06-12', amount: '$190', status: 'Cancelled' },
    { user: 'David Kim', hotel: 'Lakeside Inn', date: '2023-06-11', amount: '$230', status: 'Confirmed' }
  ];

  recentActivities = [
    { action: 'New booking', user: 'Alex Johnson', time: '2 min ago', icon: 'add_circle', color: 'text-blue-500' },
    { action: 'User registration', user: 'New customer', time: '15 min ago', icon: 'person_add', color: 'text-green-500' },
    { action: 'Hotel added', user: 'Admin', time: '1 hour ago', icon: 'hotel', color: 'text-purple-500' },
    { action: 'Booking cancelled', user: 'Sarah Lee', time: '3 hours ago', icon: 'cancel', color: 'text-red-500' }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Confirmed': return 'badge badge-success';
      case 'Pending': return 'badge badge-warning';
      case 'Cancelled': return 'badge badge-error';
      default: return 'badge badge-info';
    }
  }
}
