import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';  // <-- Make sure this import is here
export interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  // add more fields as your backend provides
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly API_URL = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    return { headers };
  }

  // Get list of all users (admin only)



getAllUsers(): Observable<User[]> {
  return this.http.get<{ users: User[] }>(`${this.API_URL}/getallusers`, this.getAuthHeaders())
    .pipe(
      map((response: { users: User[] }) => response.users || [])
    );
}

  // Get single user by ID (admin or self)
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${userId}`, this.getAuthHeaders());
  }

  // Update user (admin or self)
  updateUser(userId: string, data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/${userId}`, data, this.getAuthHeaders());
  }

  // Delete user (admin only)
  deleteUser(userId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/${userId}`, this.getAuthHeaders());
  }
}
