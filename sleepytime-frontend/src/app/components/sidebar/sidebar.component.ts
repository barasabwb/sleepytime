import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust path if needed

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
  constructor(private authService: AuthService) {}
  user: any;
  isAdmin= false;
  sidebarItems: SidebarItem[] = [];

  adminSidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'insights', route: '/admin/dashboard' },
    { label: 'Bookings', icon: 'book_online', route: '/admin/bookings' },
    { label: 'Hotels', icon: 'hotel', route: '/admin/manage-hotels' },
    { label: 'Users', icon: 'group', route: '/admin/user-management' },
  ];

  userSidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'insights', route: '/user/dashboard' },
    { label: 'Profile', icon: 'book_online', route: '/admin/profile' },

  ];
  ngOnInit(): void {
    this.user = this.authService.getUser().user;
    if(this.user.role==='admin'){
      this.isAdmin=true;
      this.sidebarItems= this.adminSidebarItems;
    }else{
      this.sidebarItems= this.userSidebarItems;
    }
  }

}
