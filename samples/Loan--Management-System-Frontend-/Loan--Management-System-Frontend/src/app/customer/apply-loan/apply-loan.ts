import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from './loan.service';
import { ProfileService } from '../profile/profile.service';
import { InterestRateService } from '../../services/interest-rate-service'; // ✅ ADDED

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './apply-loan.html',
  styleUrl: './apply-loan.css'
})
export class ApplyLoanComponent implements OnInit {

  loanForm!: FormGroup;

  error = '';
  success = '';

  canApplyLoan = false;

  loanTypes: { type: string; interest: number }[] = [];

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private profileService: ProfileService,
    private interestRateService: InterestRateService, // ✅ ADDED
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loanForm = this.fb.group({
      loanType: ['', Validators.required],
      loanAmount: [
        '',
        [Validators.required, Validators.min(10000), Validators.max(1000000)]
      ],
      tenureMonths: [
        '',
        [Validators.required, Validators.min(12), Validators.max(36)]
      ]
    });

    // 🔄 LOAD INTEREST RATES
    this.interestRateService.getAllRates().subscribe({
      next: rates => {
        this.loanTypes = rates.map(r => ({
          type: r.loanType,
          interest: r.interestRate
        }));
      },
      error: () => {
        this.error = 'Failed to load loan interest rates';
      }
    });

    // 🔐 PROFILE + ACCOUNT STATUS CHECK
    this.profileService.getMyProfile().subscribe({
      next: profile => {

        if (profile.accountStatus !== 'ACTIVE') {
          this.loanForm.disable();
          this.canApplyLoan = false;
          this.error = `Your account is ${profile.accountStatus}. Loan application is not allowed.`;
          return;
        }

        if (profile.kycStatus !== 'VERIFIED') {
          this.loanForm.disable();
          this.canApplyLoan = false;
          this.error = 'KYC verification required to apply for a loan';
          return;
        }

        this.canApplyLoan = true;
        this.loanForm.enable();
      },
      error: () => {
        this.loanForm.disable();
        this.canApplyLoan = false;
        this.error = 'Unable to fetch profile';
      }
    });
  }

  submit(): void {
    if (this.loanForm.invalid || !this.canApplyLoan) return;

    this.error = '';
    this.success = '';

    this.loanService.applyLoan(this.loanForm.value).subscribe({
      next: () => {
        this.success = 'Loan application submitted successfully';
        this.loanForm.reset();
      },
      error: err => {
        this.error = err.error?.message || 'Failed to apply loan';
      }
    });
  }
}
