import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminInterestRateService } from '../../services/admin-interest-rate.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-interest-rates.html',
  styleUrl: './admin-interest-rates.css'
})
export class AdminInterestRatesComponent implements OnInit {

  rates: any[] = [];
  loading = true;

  // form model
  selectedLoanType = '';
  interestRate: number | null = null;

  constructor(private service: AdminInterestRateService) {}

  ngOnInit(): void {
    this.loadRates();
  }

  loadRates() {
    this.service.getRates().subscribe(res => {
      this.rates = res;
      this.loading = false;
    });
  }

  edit(rate: any) {
    this.selectedLoanType = rate.loanType;
    this.interestRate = rate.interestRate;
  }

  update() {
    if (
      !this.selectedLoanType ||
      this.interestRate === null ||
      this.interestRate <= 0
    ) {
      alert('Interest rate must be greater than 0');
      return;
    }

    this.service
      .updateRate(this.selectedLoanType, this.interestRate)
      .subscribe(() => {
        alert('Interest rate updated');
        this.selectedLoanType = '';
        this.interestRate = null;
        this.loadRates();
      });
  }
}
