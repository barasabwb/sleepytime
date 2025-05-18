import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookingStatus',
  standalone: true
})
export class BookingStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'confirmed': return 'Confirmed';
      case 'cancelled': return 'Cancelled';
      case 'pending': return 'Pending';
      case 'completed': return 'Completed';
      default: return value;
    }
  }
}