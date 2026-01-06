import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: any): boolean {
    const token = this.auth.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const decoded = this.auth.getDecodedToken();
    const roles = decoded?.roles || [];
    const expectedRole = route.data?.role;

    if (roles.includes(expectedRole)) {
      return true;
    }

    // ❌ Role mismatch
    this.router.navigate(['/login']);
    return false;
  }
}
