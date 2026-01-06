import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KycService } from './kyc.service';

@Component({
  selector: 'app-kyc-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kyc-upload.html',
  styleUrl: './kyc-upload.css'
})
export class KycUploadComponent implements OnInit {

  selectedType: 'AADHAAR' | 'PAN' | 'ADDRESS_PROOF' | '' = '';
  documentNumber = '';

  documents: any[] = [];

  loading = false;
  message = '';
  error = '';

  constructor(private kycService: KycService) {}

  ngOnInit() {
    this.loadMyDocuments();
  }

  loadMyDocuments() {
    this.kycService.getMyKycDocuments().subscribe({
      next: res => this.documents = res,
      error: () => this.error = 'Failed to load KYC documents'
    });
  }

  submitKyc() {
    if (!this.selectedType || !this.documentNumber) {
      this.error = 'All fields are required';
      return;
    }

    this.loading = true;
    this.error = '';
    this.message = '';

    const payload = {
      type: this.selectedType,
      documentNumber: this.documentNumber
    };

    this.kycService.uploadKyc(payload).subscribe({
      next: () => {
        this.message = 'KYC document uploaded successfully';
        this.documentNumber = '';
        this.selectedType = '';
        this.loadMyDocuments();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to upload KYC document';
        this.loading = false;
      }
    });
  }
}
