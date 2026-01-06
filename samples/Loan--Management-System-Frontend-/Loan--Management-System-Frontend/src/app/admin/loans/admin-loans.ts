import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoanService } from './admin-loans.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-loans.html',
  styleUrl: './admin-loans.css'
})
export class AdminLoansComponent implements OnInit {

  loans: any[] = [];
  loading = true;
  error = '';

  constructor(private loanService: AdminLoanService) {}

  ngOnInit(): void {
    this.fetchLoans();
  }

  fetchLoans() {
    this.loanService.getAllLoans().subscribe({
      next: (res) => {
        this.loans = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load loan applications';
        this.loading = false;
      }
    });
  }
}
