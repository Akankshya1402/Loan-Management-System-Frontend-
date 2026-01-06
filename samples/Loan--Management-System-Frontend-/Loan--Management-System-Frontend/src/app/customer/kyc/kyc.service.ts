import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KycService {

  private baseUrl = 'http://localhost:9090/api/customers/me/kyc';

  constructor(private http: HttpClient) {}

 uploadKyc(payload: any) {
  return this.http.post(
    'http://localhost:9090/api/customers/me/kyc',
    payload,
    {
      observe: 'response',
      responseType: 'text'
    }
  );
}

  getMyKycDocuments(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
