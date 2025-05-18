import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

export interface User {
  userId?: string;
  id?: string; // your backend uses _id
  name: string;
  email: string;
  role: string;
  status?: string;
  lastActive?: Date;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly API_URL = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    return { headers };
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`${this.API_URL}/getallusers`, this.getAuthHeaders()).pipe(
      map((response) => response.users || [])
    );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${userId}`, this.getAuthHeaders());
  }

  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/updateuser/${id}`, userData, this.getAuthHeaders());
  }

  deleteUser(userId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/${userId}`, this.getAuthHeaders());
  }

  getUserProfile(): Observable<{ user: User }> {
  return this.http.get<{ user: User }>(`${this.API_URL}/profile`, this.getAuthHeaders());
}

  updateUserProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/profile`, userData, this.getAuthHeaders());
  }
}
