import { Routes } from '@angular/router';

// =======================
// PUBLIC PAGES
// =======================
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password';
import { LoanDetailsComponent } from './customer/loan-details/loan-details';
import { HomeComponent } from './pages/home/home';

// =======================
// CUSTOMER
// =======================
import { CreateProfileComponent } from './customer/profile/create-profile';
import { CustomerLayoutComponent } from './customer/layout/customer-layout';

// =======================
// ADMIN
// =======================
import { AdminLayoutComponent } from './admin/layout/admin-layout';

export const routes: Routes = [

  // =======================
  // PUBLIC ROUTES
  // =======================
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // ✅ HOME PAGE
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // =======================
  // CUSTOMER PROFILE CREATION
  // =======================
  {
    path: 'customer/profile/create',
    component: CreateProfileComponent
  },

  // =======================
  // CUSTOMER ROUTES (LAYOUT)
  // =======================
  {
    path: 'customer',
    component: CustomerLayoutComponent,
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./customer/dashboard/dashboard')
            .then(m => m.DashboardComponent)
      },

      {
        path: 'apply-loan',
        loadComponent: () =>
          import('./customer/apply-loan/apply-loan')
            .then(m => m.ApplyLoanComponent)
      },

      {
        path: 'loan-details/:loanId',
        component: LoanDetailsComponent
      },

      {
        path: 'my-loans',
        loadComponent: () =>
          import('./customer/my-loans/my-loans')
            .then(m => m.MyLoansComponent)
      },

      {
        path: 'repayments',
        loadComponent: () =>
          import('./customer/repayments/repayments')
            .then(m => m.RepaymentsComponent)
      },

      {
        path: 'kyc',
        loadComponent: () =>
          import('./customer/kyc/kyc-upload')
            .then(m => m.KycUploadComponent)
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./customer/profile/view-profile')
            .then(m => m.ViewProfileComponent)
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // =======================
  // ADMIN ROUTES (LAYOUT)
  // =======================
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/dashboard/admin-dashboard')
            .then(m => m.AdminDashboardComponent)
      },

      {
        path: 'kyc',
        loadComponent: () =>
          import('./admin/kyc/admin-kyc')
            .then(m => m.AdminKycComponent)
      },

      {
        path: 'customers',
        loadComponent: () =>
          import('./admin/customers/admin-customers')
            .then(m => m.AdminCustomersComponent)
      },

      {
        path: 'loans',
        loadComponent: () =>
          import('./admin/loans/admin-loans')
            .then(m => m.AdminLoansComponent)
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // =======================
  // FALLBACK
  // =======================
  { path: '**', redirectTo: 'home' }
];
