import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelResponse } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private readonly API_URL = 'http://localhost:5000/api/hotels'; // Change to your backend URL

  constructor(private http: HttpClient) {}

  getHotels(page: number = 1, limit: number = 0): Observable<HotelResponse> {
    return this.http.get<HotelResponse>(`${this.API_URL}?page=${page}&limit=${limit}`);
  }

  getTopHotels(page: number = 1, limit: number = 3): Observable<HotelResponse> {
    return this.http.get<HotelResponse>(`${this.API_URL}?page=${page}&limit=${limit}`);
  }

  getHotelById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/hotel/${id}`);
  }

  getHotelStats(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.API_URL}/hotel-stats`, { headers });
  }

  deleteHotel(id: string): Observable<void> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.API_URL}/hotel/${id}`, { headers });
  }

  // New method to add a hotel
  addHotel(hotelData: any): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    return this.http.post<any>(this.API_URL, hotelData, { headers });
  }
}
