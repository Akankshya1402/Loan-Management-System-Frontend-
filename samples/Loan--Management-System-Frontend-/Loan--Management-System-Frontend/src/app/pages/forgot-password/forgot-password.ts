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
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPasswordComponent {

  forgotForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.forgotForm = this.fb.group(
      {
        username: ['', Validators.required],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
            )
          ]
        ],

        confirmPassword: ['', Validators.required]
      },
      { validators: this.matchPasswords }
    );
  }

  matchPasswords(form: FormGroup) {
    const p = form.get('password')?.value;
    const c = form.get('confirmPassword')?.value;

    if (p && c && p !== c) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      if (form.get('confirmPassword')?.hasError('mismatch')) {
        form.get('confirmPassword')?.setErrors(null);
      }
    }
  }

  submit() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload = {
      username: this.forgotForm.value.username,
      newPassword: this.forgotForm.value.password
    };

    this.authService.forgotPassword(payload).subscribe({
      next: () => {
        alert('Password reset successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err?.error?.message || 'Password reset failed');
        this.isSubmitting = false;
      }
    });
  }
}
