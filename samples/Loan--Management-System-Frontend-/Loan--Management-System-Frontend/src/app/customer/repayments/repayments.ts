import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../models/loan.model';
import { EmiSchedule } from '../../models/emi.model';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './repayments.html',
  styleUrl: './repayments.css'
})
export class RepaymentsComponent implements OnInit {

  activeLoan?: Loan;
  emis: EmiSchedule[] = [];

  loading = true;
  error = '';
  payingEmiNumber?: number;

  /* Payment modal */
  showPaymentModal = false;
  selectedEmi?: EmiSchedule;
  paymentMethod: 'UPI' | 'CARD' | 'DEBIT' = 'UPI';

  paymentForm!: FormGroup;

  constructor(
    private loanService: LoanService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initPaymentForm();

    this.loanService.getMyActiveLoans().subscribe({
      next: (loans) => {
        if (!loans || loans.length === 0) {
          this.loading = false;
          return;
        }

        const loan = loans[0];
        this.activeLoan = loan;
        this.loadEmis(loan.loanId);
      },
      error: () => {
        this.error = 'Failed to load active loan';
        this.loading = false;
      }
    });
  }

  initPaymentForm() {
    this.paymentForm = this.fb.group({
      upiId: [''],
      cardNumber: [''],
      expiry: [''],
      cvv: ['']
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

  /** Only first unpaid EMI can be paid */
  canPayEmi(emi: EmiSchedule): boolean {
    const firstUnpaid = this.emis.find(e => e.status !== 'PAID');
    return firstUnpaid?.emiNumber === emi.emiNumber;
  }

  openPaymentModal(emi: EmiSchedule) {
    this.selectedEmi = emi;
    this.paymentMethod = 'UPI';
    this.applyValidators();
    this.showPaymentModal = true;
  }

  closePaymentModal() {
    this.showPaymentModal = false;
    this.selectedEmi = undefined;
    this.paymentForm.reset();
  }

  setMethod(method: 'UPI' | 'CARD' | 'DEBIT') {
    this.paymentMethod = method;
    this.applyValidators();
  }

  /** 🔐 VALIDATIONS BASED ON PAYMENT METHOD */
  applyValidators() {
    this.paymentForm.reset();

    // clear all validators first
    Object.values(this.paymentForm.controls).forEach(control => {
      control.clearValidators();
      control.updateValueAndValidity();
    });

    if (this.paymentMethod === 'UPI') {
      this.paymentForm.get('upiId')?.setValidators([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/)
      ]);
    } else {
      this.paymentForm.get('cardNumber')?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{16}$/) // 16 digits
      ]);

      this.paymentForm.get('expiry')?.setValidators([
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/) // MM/YY
      ]);

      this.paymentForm.get('cvv')?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{3}$/) // 3 digits
      ]);
    }

    Object.values(this.paymentForm.controls).forEach(c => c.updateValueAndValidity());
  }

  confirmPayment() {
    if (!this.selectedEmi || this.paymentForm.invalid) return;

    this.showPaymentModal = false;
    this.payingEmiNumber = this.selectedEmi.emiNumber;

    // fake gateway delay
    setTimeout(() => {
      this.payEmi(this.selectedEmi!);
    }, 800);
  }

  payEmi(emi: EmiSchedule) {
    if (!this.activeLoan) return;

    this.loanService.payEmi({
      loanId: this.activeLoan.loanId,
      customerId: this.activeLoan.customerId,
      emiNumber: emi.emiNumber,
      amount: emi.emiAmount
    }).subscribe({
      next: () => {
        this.payingEmiNumber = undefined;
        this.loadEmis(this.activeLoan!.loanId);
      },
      error: () => {
        this.payingEmiNumber = undefined;
        alert('Payment Successful');
      }
    });
  }
}
