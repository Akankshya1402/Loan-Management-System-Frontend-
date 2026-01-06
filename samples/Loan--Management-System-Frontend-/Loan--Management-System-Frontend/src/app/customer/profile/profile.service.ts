import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerProfile } from './customer-profile.model';
@Injectable({ providedIn: 'root' })
export class ProfileService {

  private baseUrl = 'http://localhost:9090/api/customers';

  constructor(private http: HttpClient) {}

  getMyProfile() {
  return this.http.get<CustomerProfile>(
    `${this.baseUrl}/me`
  );
}

  createProfile(data: any) {
    return this.http.post(this.baseUrl, data);
  }
}
