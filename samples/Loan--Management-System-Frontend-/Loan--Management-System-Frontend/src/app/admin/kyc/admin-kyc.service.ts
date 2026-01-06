import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// admin-kyc.service.ts
@Injectable({ providedIn: 'root' })
export class AdminKycService {

  private BASE_URL = 'http://localhost:9090/api/admin/customers/kyc';

  constructor(private http: HttpClient) {}

  getAllKyc() {
    return this.http.get<any[]>(this.BASE_URL);
  }

  approve(id: string, remarks?: string) {
    return this.http.put(
      `${this.BASE_URL}/${id}/approve`,
      null,
      { params: { remarks: remarks || '' } }
    );
  }

  reject(id: string, remarks: string) {
    return this.http.put(
      `${this.BASE_URL}/${id}/reject`,
      null,
      { params: { remarks } }
    );
  }
}
