import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-profile.html',
  styleUrl: './create-profile.css'
})
export class CreateProfileComponent implements OnInit {

  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],

      // ✅ EMAIL IS NOW EDITABLE
      email: ['', [Validators.required, Validators.email]],

      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[6-9]\\d{9}$')
        ]
      ],
      monthlyIncome: ['', Validators.required]
    });
  }

  submit() {
  console.log('Submit clicked');

  if (this.profileForm.invalid) {
    console.log('Form invalid', this.profileForm.value);
    this.profileForm.markAllAsTouched();
    return;
  }

  console.log('Sending data:', this.profileForm.value);

  this.profileService.createProfile(this.profileForm.value)
    .subscribe({
      next: (res) => {
        console.log('Profile created', res);
        this.router.navigate(['/customer/dashboard']);
      },
      error: (err) => {
        console.error('Create profile failed', err);
        alert('Profile creation failed');
      }
    });
}

}
