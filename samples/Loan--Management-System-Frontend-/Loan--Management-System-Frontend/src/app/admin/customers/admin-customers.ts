import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCustomersService } from './admin-customers.service';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-customers.html',
  styleUrl: './admin-customers.css'
})
export class AdminCustomersComponent implements OnInit {

  customers: any[] = [];
  loading = true;
  error = '';

  constructor(private customerService: AdminCustomersService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
  this.customerService.getAllCustomers().subscribe({
    next: (res: any) => {
      this.customers = res.content; // ✅ FIX
      this.loading = false;
    },
    error: () => {
      this.error = 'Failed to load customers';
      this.loading = false;
    }
  });
}

}
