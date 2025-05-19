import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingApiResponse } from '../models/booking.model';
import { SingleBookingApiResponse } from '../models/booking.model';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5000/api/bookings/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    let headers = {};
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headers = {
          Authorization: `Bearer ${token}`
        };
      }
    }
    return new HttpHeaders(headers);
  }

  getBookings(): Observable<BookingApiResponse> {
    return this.http.get<BookingApiResponse>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getMyBookings(): Observable<BookingApiResponse> {
    return this.http.get<BookingApiResponse>(this.apiUrl+'my', { headers: this.getAuthHeaders() });
  }

  createBooking(bookingData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bookingData, { headers: this.getAuthHeaders() });
  }

  cancelBooking(bookingId: string): Observable<any> {
    const cancelUrl = `${this.apiUrl}getbooking/${bookingId}/cancel`;
    return this.http.put<any>(cancelUrl, {}, { headers: this.getAuthHeaders() });
  }

  getBookingById(bookingId: string): Observable<SingleBookingApiResponse> {
    console.log(bookingId);
    const url = `${this.apiUrl}getbooking/${bookingId}`;
    return this.http.get<SingleBookingApiResponse>(url, { headers: this.getAuthHeaders() });
  }
}
