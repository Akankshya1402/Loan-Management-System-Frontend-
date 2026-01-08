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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9_]+$/)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
          )
        ]
      ]
    });

    // ✅ Clear "username exists" error when user types again
    this.registerForm.get('username')?.valueChanges.subscribe(() => {
      if (this.registerForm.get('username')?.hasError('usernameExists')) {
        this.registerForm.get('username')?.setErrors(null);
      }
    });
  }

  handleRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isSubmitting = false;

        // ✅ Username already exists handling
        if (
          err.status === 409 &&
          typeof err.error === 'string' &&
          err.error.includes('Username')
        ) {
          this.registerForm.get('username')?.setErrors({
            usernameExists: true
          });
          return;
        }

        alert(err?.error?.message || 'Registration failed');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
