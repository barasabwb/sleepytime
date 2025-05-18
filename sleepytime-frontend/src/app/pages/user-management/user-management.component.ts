import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserRolePipe } from '../../shared/pipes/user-role.pipe';
import { UserStatusPipe } from '../../shared/pipes/user-status.pipe';
import { UserFormComponent } from '../user-form/user-form.component';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff' | 'guest';
  status: 'active' | 'suspended' | 'pending';
  lastActive: Date;
  createdAt: Date;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    UserRolePipe,
    UserStatusPipe
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  displayedColumns: string[] = ['name', 'email', 'role', 'status', 'lastActive', 'actions'];
  users: User[] = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@sleeptime.com',
      role: 'admin',
      status: 'active',
      lastActive: new Date('2023-06-15'),
      createdAt: new Date('2023-01-10')
    },
    {
      id: '2',
      name: 'Hotel Manager',
      email: 'manager@example.com',
      role: 'manager',
      status: 'active',
      lastActive: new Date('2023-06-14'),
      createdAt: new Date('2023-02-15')
    },
    {
      id: '3',
      name: 'Front Desk',
      email: 'staff@example.com',
      role: 'staff',
      status: 'active',
      lastActive: new Date('2023-06-10'),
      createdAt: new Date('2023-03-20')
    },
    {
      id: '4',
      name: 'John Guest',
      email: 'guest@example.com',
      role: 'guest',
      status: 'active',
      lastActive: new Date('2023-06-12'),
      createdAt: new Date('2023-04-05')
    }
  ];

  // Pagination
  pageSize = 5;
  pageIndex = 0;
  totalUsers = 20;

  constructor(private dialog: MatDialog) {}

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  openUserForm(user?: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // In real app: refresh user list
        console.log('User saved', result);
      }
    });
  }

  updateUserStatus(userId: string, status: User['status']): void {
    const user = this.users.find(u => u.id === userId);
    if (user) user.status = status;
  }
}
