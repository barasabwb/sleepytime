import { Routes } from '@angular/router';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { BrowseHotelsComponent } from './pages/browse-hotels/browse-hotels.component';

export const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'hotels', component: BrowseHotelsComponent },
      {
        path: 'hotels/:id',
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
      loadComponent: () =>
        import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
    },
    {
      path: 'manage-hotels',
      loadComponent: () =>
        import('./pages/manage-hotels/manage-hotels.component').then(m => m.ManageHotelsComponent)
    }
  ]
}

];
