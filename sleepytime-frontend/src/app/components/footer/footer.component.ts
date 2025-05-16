import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('footerRef') footerRef!: ElementRef;

  ngAfterViewInit(): void {
    gsap.from(this.footerRef.nativeElement, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    });
  }
}
