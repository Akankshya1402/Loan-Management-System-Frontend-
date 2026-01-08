import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { LoanService } from '../../services/loan.service';
import { RepaymentService } from '../../services/repayments.service';

import { Loan } from '../../models/loan.model';
import { EmiSchedule } from '../../models/emi.model';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  stats: any[] = [];

  payments: any[] = [];
  loadingPayments = true;

  // loanId → loanType mapping
  loanTypeMap: { [loanId: string]: string } = {};

  constructor(
    private loanService: LoanService,
    private repaymentService: RepaymentService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    // ============================
    // FETCH LOANS
    // ============================
    this.loanService.getMyActiveLoans().subscribe({
      next: (loans: Loan[]) => {

        if (!loans.length) {
          this.stats = [];
          this.payments = [];
          this.loadingPayments = false;
          return;
        }

        // Build loanId → loanType map
        loans.forEach(loan => {
          this.loanTypeMap[loan.loanId] = loan.loanType;
        });

        const activeLoan = loans[0];

        // ============================
        // EMI STATS
        // ============================
        this.loanService.getEmiSchedule(activeLoan.loanId).subscribe({
          next: (emis: EmiSchedule[]) => {

            const nextEmi = emis
              .filter(e => e.status === 'PENDING')
              .sort((a, b) =>
                new Date(a.dueDate).getTime() -
                new Date(b.dueDate).getTime()
              )[0];

            this.stats = [
              { title: 'Active Loans', value: loans.length, icon: '📄' },
              {
                title: 'Outstanding Balance',
                value: `₹${activeLoan.outstandingAmount?.toLocaleString()}`,
                icon: '💰'
              },
              {
                title: 'Monthly EMI',
                value: `₹${activeLoan.emiAmount?.toLocaleString()}`,
                icon: '📅'
              },
              {
                title: 'Next Payment',
                value: nextEmi
                  ? new Date(nextEmi.dueDate).toDateString()
                  : 'All Paid',
                icon: '⏳'
              }
            ];
          }
        });

        // ============================
        // PAYMENT HISTORY
        // ============================
        const customerId = activeLoan.customerId;

        this.repaymentService.getPaymentsByCustomer(customerId).subscribe({
          next: (data) => {
            this.payments = data
              .sort((a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              )
              .slice(0, 5);

            this.loadingPayments = false;
          },
          error: () => {
            this.loadingPayments = false;
          }
        });
      }
    });
  }

  // ============================
  // DOWNLOAD INVOICE PDF
  // ============================
  downloadInvoice(paymentId: string): void {
  const url = `http://localhost:9090/api/invoices/payment/${paymentId}/pdf`;

  this.http.get(url, {
    responseType: 'blob',
    observe: 'response'
  }).subscribe({
    next: (res) => {
      const blob = res.body!;
      console.log('Downloaded size:', blob.size); // MUST be > 5KB

      const fileURL = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = fileURL;
      a.download = `invoice-${paymentId}.pdf`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(fileURL);
    },
    error: (err) => {
      console.error('Invoice download failed', err);
      alert('Failed to download invoice');
    }
  });
}

}
