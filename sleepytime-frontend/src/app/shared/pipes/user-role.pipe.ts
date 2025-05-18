import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRole',
  standalone: true
})
export class UserRolePipe implements PipeTransform {
  transform(value: string): string {
    switch (value.toLowerCase()) {
      case 'admin':
        return 'Administrator';
      case 'manager':
        return 'Manager';
      case 'staff':
        return 'Staff Member';
      case 'guest':
        return 'Guest User';
      default:
        return value;
    }
  }
}
