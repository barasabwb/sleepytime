import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component'; // adjust path if needed
import { FooterComponent } from '../footer/footer.component'; // adjust path if needed
import { NavbarComponent } from '../navbar/navbar.component'; // Import NavbarComponent

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent,FooterComponent],
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent {
  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

}
