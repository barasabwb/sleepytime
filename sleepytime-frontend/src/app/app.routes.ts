import { Routes } from '@angular/router';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { BrowseHotelsComponent } from './pages/browse-hotels/browse-hotels.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
export const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'hotels',  canActivate: [authGuard], component: BrowseHotelsComponent },
      {
        path: 'hotels/:id',
         canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/hotel-details/hotel-details.component').then(m => m.HotelDetailsComponent)
      },
      {
        path: 'booking',
        loadComponent: () =>
          import('./pages/booking/booking.component').then(m => m.BookingComponent)
      }
    ]
  },

  {
  path: 'admin',
  component: UserLayoutComponent,
  children: [
    {
      path: 'dashboard',
       canActivate: [adminGuard],
      loadComponent: () =>
        import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
    },
    {
      path: 'manage-hotels',
             canActivate: [adminGuard],

      loadComponent: () =>
        import('./pages/manage-hotels/manage-hotels.component').then(m => m.ManageHotelsComponent)
    },
    {
      path: 'hotel-details',
             canActivate: [adminGuard],

      loadComponent: () =>
        import('./pages/hotel-details-admin/hotel-details-admin.component').then(m => m.HotelDetailsComponent)
    },
    {
      path: 'manage-rooms',
             canActivate: [adminGuard],

      loadComponent: () =>
        import('./pages/room-management/room-management.component').then(m => m.RoomManagementComponent)
    },
    {
      path: 'bookings',
             canActivate: [adminGuard],

      loadComponent: () =>
        import('./pages/booking-management/booking-management.component').then(m => m.BookingManagementComponent)
    },
    {
      path: 'profile',
             canActivate: [adminGuard],

      loadComponent: () =>
        import('./pages/profile/profile.component').then(m => m.ProfileComponent)
    },

    {
      path: 'manage-reviews',
             canActivate: [adminGuard],

      loadComponent: () =>
        import('./pages/reviews-management/reviews-management.component').then(m => m.ReviewsManagementComponent)
    },

    {
      path: 'user-management',
             canActivate: [adminGuard],

      loadComponent: () =>
        import('./pages/user-management/user-management.component').then(m => m.UserManagementComponent)
    },

  ]
}, {
  path: 'user',
  component: UserLayoutComponent,
  children: [
    {
      path: 'dashboard',
      loadComponent: () =>
        import('./user/dashboard/dashboard.component').then(m => m.UserDashboardComponent)
    }

  ]
}

];
