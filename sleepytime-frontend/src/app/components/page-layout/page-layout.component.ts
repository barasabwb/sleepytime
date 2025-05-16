import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component'; // adjust path if needed
import { FooterComponent } from '../footer/footer.component'; // adjust path if needed
@Component({
  selector: 'app-page-layout',
  imports: [RouterOutlet,FooterComponent],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.css'
})
export class PageLayoutComponent {

}
