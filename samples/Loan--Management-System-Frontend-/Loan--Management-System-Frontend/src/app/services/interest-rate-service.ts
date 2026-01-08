import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InterestRate {
  loanType: string;
  interestRate: number;
}

@Injectable({ providedIn: 'root' })
export class InterestRateService {

  private BASE_URL = 'http://localhost:9090/api/loan-processing/interest-rates';

  constructor(private http: HttpClient) {}

  getAllRates(): Observable<InterestRate[]> {
    return this.http.get<InterestRate[]>(this.BASE_URL);
  }
}
