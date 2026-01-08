import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCustomersService } from './admin-customers.service';
import { LoanService } from '../../services/loan.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-customers.html',
  styleUrl: './admin-customers.css'
})
export class AdminCustomersComponent implements OnInit {

  customers: any[] = [];
  payments: any[] = [];

  selectedCustomer: any = null;

  loading = true;
  loadingPayments = false;
  paymentsLoaded = false;
  error = '';

  constructor(
    private customerService: AdminCustomersService,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: res => {
        this.customers = res.content || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load customers';
        this.loading = false;
      }
    });
  }

  selectCustomer(customer: any): void {
    this.selectedCustomer = customer;
    this.payments = [];
    this.paymentsLoaded = false;
    this.error = '';
  }

  // ============================
  // LOAD EMI HISTORY
  // ============================
  loadPayments(): void {

    if (!this.selectedCustomer || this.loadingPayments || this.paymentsLoaded) {
      return;
    }

    this.loadingPayments = true;

    this.loanService
      .getActiveLoanByCustomer(this.selectedCustomer.customerId)
      .subscribe({
        next: loan => {
          if (!loan?.loanId) {
            this.error = 'No active loan found for this customer';
            this.loadingPayments = false;
            return;
          }

          const loanId = loan.loanId;

          forkJoin({
            emiSchedule: this.loanService.getEmiSchedule(loanId),
            paidEmis: this.loanService.getPaidEmisByLoan(loanId)
          }).subscribe({
            next: ({ emiSchedule, paidEmis }) => {

              const paidMap = new Map<number, any>();
              paidEmis.forEach(p => paidMap.set(p.emiNumber, p));

              this.payments = emiSchedule
                .sort((a, b) => a.emiNumber - b.emiNumber)
                .map(emi => {
                  const paid = paidMap.get(emi.emiNumber);

                  return {
                    emiNumber: emi.emiNumber,
                    amount: emi.emiAmount,
                    dueDate: emi.dueDate,
                    paidOn: paid?.createdAt,
                    status: paid ? 'PAID' : emi.status
                  };
                });

              this.paymentsLoaded = true;
              this.loadingPayments = false;
            },
            error: () => {
              this.error = 'Failed to load EMI history';
              this.loadingPayments = false;
            }
          });
        },
        error: () => {
          this.error = 'Failed to fetch active loan';
          this.loadingPayments = false;
        }
      });
  }

  // ============================
  // CUSTOMER ACTIONS
  // ============================
  activateCustomer(event: Event): void {
    event.stopPropagation();

    this.customerService
      .activateCustomer(this.selectedCustomer.customerId)
      .subscribe(() => {
        this.selectedCustomer.accountStatus = 'ACTIVE';
      });
  }

  suspendCustomer(event: Event): void {
    event.stopPropagation();

    this.customerService
      .deactivateCustomer(this.selectedCustomer.customerId)
      .subscribe(() => {
        this.selectedCustomer.accountStatus = 'SUSPENDED';
      });
  }

  deleteCustomer(event: Event): void {
    event.stopPropagation();

    if (!confirm('⚠ Permanently delete this customer?')) return;

    this.customerService
      .deleteCustomer(this.selectedCustomer.customerId)
      .subscribe(() => {
        this.back();
        this.loadCustomers();
      });
  }

  // ============================
  // BACK
  // ============================
  back(): void {
    this.selectedCustomer = null;
    this.payments = [];
    this.paymentsLoaded = false;
    this.error = '';
  }
}
