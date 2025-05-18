// amenity-chips.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-amenity-chips',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  template: `
    <div class="flex flex-wrap gap-2">
      <mat-chip *ngFor="let amenity of amenities">
        {{ amenity }}
      </mat-chip>
    </div>
  `,
  styles: []
})
export class AmenityChipsComponent {
  @Input() amenities: string[] = [];
}
