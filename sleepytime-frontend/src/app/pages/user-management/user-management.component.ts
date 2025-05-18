import { Component, OnInit } from '@angular/core';
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
import { UsersService, User } from '../../services/users.service';

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
    UserStatusPipe,
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'status', 'lastActive', 'actions'];

  users: User[] = [];
  pageSize = 5;
  pageIndex = 0;
  totalUsers = 0;

  constructor(private dialog: MatDialog, private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users.map(u => ({
          id: u.userId || (u as any)._id,
          name: u.name,
          email: u.email,
          role: u.role as 'admin' | 'user',
          status: u.status || 'active',  // Assuming backend sends status now or default to active
          lastActive: new Date(), // placeholder
          createdAt: new Date((u as any).createdAt),
        }));
        this.totalUsers = this.users.length;
      },
      error: (err) => {
        console.error('Failed to load users', err);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // TODO: Add backend pagination support here if needed
    this.loadUsers();
  }

  openUserForm(user?: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (user) {
          // Editing existing user
          this.usersService.updateUser(user.id!, result).subscribe({
            next: (updatedUser) => {
              this.loadUsers();
            },
            error: (err) => {
              console.error('Failed to update user', err);
              // Show error UI if you want
            }
          });
        } else {
          // TODO: handle create user if needed
        }
      }
    });
  }

  updateUserStatus(userId: string, status: User['status']): void {
    const user = this.users.find(u => u.id === userId);
    if (!user) return;

    const previousStatus = user.status;
    user.status = status;

    this.usersService.updateUser(userId, { status }).subscribe({
      next: () => {
        // optionally show success
      },
      error: () => {
        user.status = previousStatus; // revert on error
      }
    });
  }
}
