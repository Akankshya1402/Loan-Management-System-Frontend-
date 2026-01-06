import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminKycService } from './admin-kyc.service';

@Component({
  selector: 'app-admin-kyc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-kyc.html',
  styleUrls: ['./admin-kyc.css']
})
export class AdminKycComponent implements OnInit {

  // ✅ REQUIRED PROPERTIES (FIXES TS2339)
  kycs: any[] = [];
  loading: boolean = false;
  remarks: { [id: string]: string } = {};

  constructor(private adminKycService: AdminKycService) {}

  ngOnInit(): void {
    this.loadKycs();
  }

  loadKycs() {
    this.loading = true;

    this.adminKycService.getAllKyc().subscribe({
      next: (res) => {
        this.kycs = res;
        this.loading = false;
      },
      error: () => {
        alert('Failed to load KYC requests');
        this.loading = false;
      }
    });
  }

  approve(id: string) {
    const remark = this.remarks[id] || '';

    this.adminKycService.approve(id, remark).subscribe({
      next: () => {
        this.updateStatus(id, 'VERIFIED');
      },
      error: () => alert('Approval failed')
    });
  }

  reject(id: string) {
    const remark = this.remarks[id];

    if (!remark) {
      alert('Remarks required for rejection');
      return;
    }

    this.adminKycService.reject(id, remark).subscribe({
      next: () => {
        this.updateStatus(id, 'REJECTED');
      },
      error: () => alert('Rejection failed')
    });
  }

  // ✅ UPDATE UI WITHOUT REFRESH
  private updateStatus(id: string, status: string) {
    const kyc = this.kycs.find(k => k.id === id);
    if (kyc) {
      kyc.status = status;
    }
  }
}
