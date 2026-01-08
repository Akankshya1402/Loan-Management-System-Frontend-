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
  this.error = '';
  this.message = '';

  if (!this.selectedType) {
    this.error = 'Please select a document type';
    return;
  }

  if (!this.documentNumber) {
    this.error = 'Document number is required';
    return;
  }

  // ======================
  // VALIDATIONS
  // ======================

  if (this.selectedType === 'AADHAAR') {
    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(this.documentNumber)) {
      this.error = 'Aadhaar must be a 12-digit number';
      return;
    }
  }

  if (this.selectedType === 'PAN') {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(this.documentNumber.toUpperCase())) {
      this.error = 'PAN must be in format ABCDE1234F';
      return;
    }
    this.documentNumber = this.documentNumber.toUpperCase();
  }

  if (this.selectedType === 'ADDRESS_PROOF') {
    if (this.documentNumber.length < 5) {
      this.error = 'Address proof number must be at least 5 characters';
      return;
    }
  }

  // ======================
  // API CALL
  // ======================

  this.loading = true;

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
