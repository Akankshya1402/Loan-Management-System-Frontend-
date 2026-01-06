import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../customer/profile/profile.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('^[a-zA-Z0-9_]+$')
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });
  }

handleLogin() {
  if (this.loginForm.invalid) return;

  this.authService.login(this.loginForm.value).subscribe({
    next: (res) => {
      this.authService.saveToken(res.token);

      const decoded = this.authService.getDecodedToken();
      const roles: string[] = decoded?.roles || [];

      // ✅ ADMIN LOGIN
      if (roles.includes('ADMIN')) {
        this.router.navigate(['/admin/dashboard']);
        return;
      }

      // ✅ CUSTOMER LOGIN
      if (roles.includes('CUSTOMER')) {
        this.profileService.getMyProfile().subscribe({
          next: () => {
            this.router.navigate(['/customer/dashboard']);
          },
          error: () => {
            this.router.navigate(['/customer/profile/create']);
          }
        });
      }
    },
    error: () => alert('Invalid credentials')
  });
}




  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
