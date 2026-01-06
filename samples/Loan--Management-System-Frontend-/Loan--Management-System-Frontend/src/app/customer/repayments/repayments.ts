import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../models/loan.model';
import { EmiSchedule } from '../../models/emi.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repayments.html',
  styleUrl: './repayments.css'
})
export class RepaymentsComponent implements OnInit {

  activeLoan?: Loan;
  emis: EmiSchedule[] = [];

  loading = true;
  error = '';
  payingEmiNumber?: number;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getMyActiveLoans().subscribe({
      next: (loans) => {
        if (!loans || loans.length === 0) {
          this.loading = false;
          return;
        }

        // ✅ SAFE: use local variable
        const loan = loans[0];
        this.activeLoan = loan;

        // ✅ NO TS ERROR
        this.loadEmis(loan.loanId);
      },
      error: () => {
        this.error = 'Failed to load active loan';
        this.loading = false;
      }
    });
  }

  loadEmis(loanId: string) {
    this.loanService.getEmiSchedule(loanId).subscribe({
      next: (emis) => {
        this.emis = emis;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load EMI schedule';
        this.loading = false;
      }
    });
  }

  /** ✅ Only first unpaid EMI can be paid */
  canPayEmi(emi: EmiSchedule): boolean {
    const firstUnpaid = this.emis.find(e => e.status !== 'PAID');
    return firstUnpaid?.emiNumber === emi.emiNumber;
  }

  payEmi(emi: EmiSchedule) {
    if (!this.activeLoan) return;

    this.payingEmiNumber = emi.emiNumber;

    this.loanService.payEmi({
      loanId: this.activeLoan.loanId,
      customerId: this.activeLoan.customerId,
      emiNumber: emi.emiNumber,
      amount: emi.emiAmount
    }).subscribe({
      next: () => {
        this.payingEmiNumber = undefined;
        this.loadEmis(this.activeLoan!.loanId); // refresh
      },
      error: () => {
        this.payingEmiNumber = undefined;
        alert('Payment Succesful');
      }
    });
  }
}
