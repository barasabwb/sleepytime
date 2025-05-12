import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})


export class NavbarComponent implements AfterViewInit {
  @ViewChildren('navItem') navItems!: QueryList<ElementRef>;
  @ViewChildren('logo') logo!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    // Animate nav items
    gsap.from(this.navItems.map(el => el.nativeElement), {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
    });

    // Animate logo
    if (this.logo.first) {
      gsap.from(this.logo.first.nativeElement, {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: 'back.out(1.7)',
      });
    }
  }
}
