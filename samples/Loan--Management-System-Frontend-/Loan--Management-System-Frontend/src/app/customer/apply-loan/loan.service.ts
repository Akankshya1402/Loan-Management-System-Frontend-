import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoanService {

  private BASE_URL = 'http://localhost:9090/api/loans';

  constructor(private http: HttpClient) {}

  applyLoan(payload: {
    loanType: string;
    loanAmount: number;
    tenureMonths: number;
  }): Observable<any> {
    return this.http.post(this.BASE_URL, payload);
  }
}
