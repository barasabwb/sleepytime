import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface StatCard {
  label: string;
  value: string;
  icon: string;
  change: number;
  trend: 'up' | 'down';
}

interface Booking {
  guest: string;
  hotel: string;
  dates: string;
  amount: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = '/api'; // base API URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`
    });
  }

  getHotelStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotels/hotel-stats`, {
      headers: this.getAuthHeaders()
    });
  }

  getAllBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookings`, {
      headers: this.getAuthHeaders()
    });
  }

  // Add other admin API methods here as needed
}
