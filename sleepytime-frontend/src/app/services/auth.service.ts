import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:5000/api/users'; // Adjust to match your backend

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, { email, password }).pipe(
      tap(response => {
        if (this.isBrowser()) {
          localStorage.setItem('token', response.token);
          this.fetchUserProfile().subscribe(user => {
            localStorage.setItem('user', JSON.stringify(user));
          });
        }
      })
    );
  }

  fetchUserProfile(): Observable<any> {
    let headers = {};
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = {
          Authorization: `Bearer ${token}`
        };
      }
    }

    return this.http.get(`${this.API_URL}/profile`, { headers: new HttpHeaders(headers) });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/register`, { name, email, password }).pipe(
      tap(res => {
        if (this.isBrowser()) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  isLoggedIn(): boolean {
    return this.isBrowser() && !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }

  getUser(): any {
    if (!this.isBrowser()) return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserRole(): string | null {
    const user = this.getUser().user;
    return user?.role ?? null;
  }
}
