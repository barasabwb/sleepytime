import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'insights', route: '/dashboard' },
    { label: 'Bookings', icon: 'book_online', route: '/bookings', badge: 12 },
    { label: 'Hotels', icon: 'hotel', route: '/hotels' },
    { label: 'Users', icon: 'group', route: '/users', badge: 3 },
    { label: 'Reviews', icon: 'star', route: '/reviews' },
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];
}
