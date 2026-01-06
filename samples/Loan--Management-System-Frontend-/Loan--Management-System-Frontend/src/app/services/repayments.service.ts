import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RepaymentService {

  private LOAN_APP_URL = 'http://localhost:9090/api/loan-processing';

  constructor(private http: HttpClient) {}

  // =========================
  // EXISTING METHODS (UNCHANGED)
  // =========================

  getMyActiveLoans() {
    return this.http.get<any[]>(
      'http://localhost:9090/api/loan-processing/me'
    );
  }

  getEmiOverview(loanId: string) {
    return this.http.get<any>(
      `http://localhost:9090/api/loan-processing/${loanId}/emi-overview`
    );
  }

  // =========================
  // ✅ NEW METHOD (PAYMENT HISTORY)
  // =========================
  getPaymentsByCustomer(customerId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:9090/api/payments/customer/${customerId}`
    );
  }

}
