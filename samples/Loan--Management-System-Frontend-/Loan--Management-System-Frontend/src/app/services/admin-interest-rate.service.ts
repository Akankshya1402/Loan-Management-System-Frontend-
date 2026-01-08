import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminInterestRateService {

  private BASE_URL = 'http://localhost:9090/api/loan-processing/interest-rates';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    };
  }

  getRates(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL, this.headers());
  }

  updateRate(loanType: string, rate: number) {
    return this.http.put(
      `${this.BASE_URL}/${loanType}?rate=${rate}`,
      {},
      this.headers()
    );
  }
}
