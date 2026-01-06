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

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './apply-loan.html',
  styleUrl: './apply-loan.css'
})
export class ApplyLoanComponent implements OnInit {

  loanForm!: FormGroup;
  kycVerified = false;
  error = '';
  success = '';

  loanTypes = ['PERSONAL', 'HOME', 'VEHICLE', 'EDUCATION'];

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loanForm = this.fb.group({
      loanType: ['', Validators.required],
      loanAmount: ['', [Validators.required, Validators.min(10000)]],
      tenureMonths: ['', [Validators.required, Validators.min(12), Validators.max(36)]]
    });

    // 🔐 Check KYC
    this.profileService.getMyProfile().subscribe({
      next: profile => {
        this.kycVerified = profile.kycStatus === 'VERIFIED';
        if (!this.kycVerified) {
          this.loanForm.disable();
          this.error = 'KYC verification required to apply for a loan';
        }
      },
      error: () => {
        this.error = 'Unable to fetch profile';
        this.loanForm.disable();
      }
    });
  }

  submit() {
    if (this.loanForm.invalid) return;

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
