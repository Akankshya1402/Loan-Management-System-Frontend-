import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoanService {

  // API Gateway URLs
  private PROCESSING_URL = 'http://localhost:9090/api/loan-processing';
  private APPLICATION_URL = 'http://localhost:9090/api/loans';
  private PAYMENT_URL = 'http://localhost:9090/api/payments';

  constructor(private http: HttpClient) {}

  // =========================
  // APPLY LOAN
  // =========================
  applyLoan(payload: {
    loanType: string;
    loanAmount: number;
    tenureMonths: number;
  }) {
    return this.http.post(
      `${this.APPLICATION_URL}`,
      {
        loanType: payload.loanType,
        requestedAmount: payload.loanAmount,
        tenureMonths: payload.tenureMonths
      }
    );
  }

  // =========================
  // MY LOAN APPLICATIONS
  // =========================
  getMyLoanApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APPLICATION_URL}/me`);
  }

  // =========================
  // ACTIVE LOANS
  // =========================
  getMyActiveLoans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.PROCESSING_URL}/my/active`);
  }

  // =========================
  // EMI OVERVIEW
  // =========================
  getEmiOverview(loanId: string): Observable<any> {
    return this.http.get<any>(
      `${this.PROCESSING_URL}/${loanId}/emi-overview`
    );
  }

  // =========================
  // EMI SCHEDULE
  // =========================
  getEmiSchedule(loanId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.PROCESSING_URL}/${loanId}/emis`
    );
  }

  // =========================
  // PAY EMI
  // =========================
  payEmi(payload: {
    loanId: string;
    customerId: string;
    emiNumber: number;
    amount: number;
  }) {
    return this.http.post(
      `${this.PAYMENT_URL}`,
      payload
    );
  }
  getPaidEmisByLoan(loanId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.PAYMENT_URL}/loan/${loanId}`
    );
  }
  getActiveLoanByCustomer(customerId: string): Observable<any> {
    return this.http.get<any>(
      `${this.PROCESSING_URL}/customer/${customerId}/active`
    );
  }
}

