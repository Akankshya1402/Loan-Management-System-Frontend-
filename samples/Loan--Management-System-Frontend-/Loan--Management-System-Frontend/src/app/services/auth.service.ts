import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:9090/api/auth';

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }) {
    return this.http.post<any>(`${this.BASE_URL}/login`, data);
  }

  register(data: { username: string; password: string }) {
    return this.http.post(`${this.BASE_URL}/register`, data);
  }

  forgotPassword(data: { username: string; newPassword: string }) {
    return this.http.post(`${this.BASE_URL}/forgot-password`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  // ✅ DECODE JWT
  getDecodedToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  // ✅ GET ROLE
  getRole(): 'ADMIN' | 'CUSTOMER' | null {
    const decoded = this.getDecodedToken();
    return decoded?.roles?.[0] || null;
  }

  getUsername(): string {
    const decoded = this.getDecodedToken();
    return decoded?.sub || '';
  }
}
