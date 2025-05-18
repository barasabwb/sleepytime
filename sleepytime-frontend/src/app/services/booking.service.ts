import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingApiResponse } from '../models/booking.model';

interface ApiBooking {
  // your ApiBooking interface here same as before
}



@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5000/api/bookings/';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<BookingApiResponse> {
    let headers = {};
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headers = {
          Authorization: `Bearer ${token}`
        };
      }
    }
    return this.http.get<BookingApiResponse>(this.apiUrl, { headers: new HttpHeaders(headers) });
  }

  createBooking(bookingData: any): Observable<any> {
    let headers = {};
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headers = {
          Authorization: `Bearer ${token}`
        };
      }
    }
    return this.http.post<any>(this.apiUrl, bookingData, { headers: new HttpHeaders(headers) });
  }
}
