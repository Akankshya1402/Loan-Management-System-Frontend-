import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../models/loan.model';
import { LoanDetailsComponent } from '../loan-details/loan-details';

@Component({
  standalone: true,
  imports: [CommonModule, LoanDetailsComponent],
  templateUrl: './my-loans.html',
  styleUrl: './my-loans.css'
})
export class MyLoansComponent implements OnInit {

  loans: Loan[] = [];
  selectedLoan?: Loan;

  loading = true;
  error = '';

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getMyActiveLoans().subscribe({
      next: (data) => {
        this.loans = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load loans';
        this.loading = false;
      }
    });
  }

  getLoanTypeLabel(type: string): string {
    switch (type) {
      case 'HOME': return 'Home Loan';
      case 'VEHICLE': return 'Vehicle Loan';
      case 'PERSONAL': return 'Personal Loan';
      default: return type;
    }
  }

  // ✅ NO NAVIGATION
  openLoan(loan: Loan) {
    this.selectedLoan = loan;
  }
}
