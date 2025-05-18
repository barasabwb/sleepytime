import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

interface Room {
  id: string;
  type: string;
  price: number;
  capacity: number;
  amenities: string[];
  status: 'available' | 'booked' | 'maintenance';
}

@Component({
  selector: 'app-room-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css']
})
export class RoomManagementComponent implements OnInit {
  displayedColumns: string[] = ['type', 'price', 'capacity', 'status', 'actions'];
  rooms: Room[] = [];
  hotelId!: string;
  hotelName = 'Grand Plaza Hotel'; // Would come from API

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('hotelId')!;
    this.loadRooms();
  }

  loadRooms(): void {
    // Mock data - replace with API call
    this.rooms = [
      {
        id: '1',
        type: 'Deluxe Suite',
        price: 250,
        capacity: 2,
        amenities: ['TV', 'Mini Bar', 'AC'],
        status: 'available'
      },
      {
        id: '2',
        type: 'Executive Room',
        price: 180,
        capacity: 2,
        amenities: ['TV', 'AC'],
        status: 'booked'
      },
      {
        id: '3',
        type: 'Family Room',
        price: 320,
        capacity: 4,
        amenities: ['TV', 'Mini Bar', 'AC', 'Sofa'],
        status: 'available'
      }
    ];
  }



  deleteRoom(id: string): void {
    if (confirm('Delete this room?')) {
      // API call would go here
      this.rooms = this.rooms.filter(r => r.id !== id);
      this.snackBar.open('Room deleted', 'Close', { duration: 2000 });
    }
  }

  viewBookings(roomId: string): void {
    this.router.navigate(['/admin/bookings'], {
      queryParams: {
        hotelId: this.hotelId,
        roomId
      }
    });
  }
}
