import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../models/loan.model';
import { EmiOverview } from '../../models/emi-overview.model';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-loan-details',
  templateUrl: './loan-details.html',
  styleUrl: './loan-details.css'
})
export class LoanDetailsComponent implements OnInit {

  @Input() loan!: Loan;

  emiOverview?: EmiOverview;
  loading = true;
  error = '';

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    forkJoin({
      emiOverview: this.loanService.getEmiOverview(this.loan.loanId)
    }).subscribe({
      next: ({ emiOverview }) => {
        this.emiOverview = emiOverview;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load EMI details';
        this.loading = false;
      }
    });
  }
}
