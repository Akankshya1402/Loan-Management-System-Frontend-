# Loan Management System – Frontend (Angular)

This repository contains the frontend application for a microservices-based Loan Management System (LMS). The frontend is built using Angular and acts as the primary user interface for customers, loan officers, and administrators. It communicates with backend microservices via an API Gateway and supports the complete loan lifecycle including loan application, approval or rejection, EMI payments, notifications, and analytics visualization.

---

## Project Objective

The objective of this frontend application is to provide a secure, scalable, and role-based user interface that simplifies complex loan management workflows handled by backend microservices. It ensures clean separation of concerns, maintainability, and smooth integration with distributed backend services.

---

## User Roles and End-to-End Flow

### Customer Flow
1. Customer registers or logs in to the system.
2. Authentication token (JWT) is issued by Auth Service.
3. Customer applies for a loan by submitting personal, financial, and loan details.
4. Loan application status is shown as PENDING.
5. Customer receives notification updates on loan status.
6. If approved, customer can view loan details and EMI schedule.
7. Customer initiates EMI payments.
8. Payment status and transaction references are displayed.
9. Customer can view complete loan and payment history.

### Loan Officer Flow
1. Loan officer logs in using authorized credentials.
2. Loan officer dashboard displays all pending loan applications.
3. Loan officer reviews customer profile, credit details, and loan information.
4. Loan officer approves or rejects the loan.
5. Approval or rejection triggers backend loan processing workflow.
6. Customer is notified of the decision.

### Admin Flow
1. Admin logs in securely.
2. Admin dashboard shows system-wide analytics.
3. Admin monitors loan approvals, rejections, and EMI payments.
4. Admin views revenue insights and platform-level statistics.

---

## Core Functionalities

### Authentication and Security
- JWT-based authentication
- Role-based authorization
- Route protection using Angular Guards
- HTTP Interceptors for JWT injection and global error handling

### Loan Management
- Loan application submission
- Loan approval and rejection
- Loan status tracking
- EMI schedule visualization

### Payments
- EMI payment initiation
- Payment status tracking
- Transaction reference handling

### Analytics and Reports
- Loan statistics dashboards
- Approval and rejection ratios
- Payment and revenue insights

### Notifications
- Loan status notifications
- Payment confirmation alerts

---

## Technology Stack

Frontend:
- Angular (Standalone Components)
- TypeScript
- Angular Material
- SCSS
- RxJS

Integration:
- RESTful APIs
- JWT Authentication
- API Gateway

Tooling:
- Node.js
- npm
- Angular CLI

---

## Application Architecture

The frontend follows a feature-based modular architecture.

src/
- app/
  - core/
    - services/        (API communication services)
    - guards/          (Auth and role-based guards)
    - interceptors/    (JWT and error interceptors)
  - features/
    - auth/            (Login and registration)
    - customer/        (Customer dashboards and actions)
    - loan-officer/    (Loan approval workflows)
    - admin/           (Admin dashboards)
    - payments/        (EMI and payment modules)
  - shared/
    - components/      (Reusable UI components)
    - models/          (DTOs and interfaces)
  - app.routes.ts      (Centralized routing)
- assets/
- environments/
- styles.scss

---

## Backend Integration Flow

1. Frontend sends API requests to API Gateway.
2. API Gateway routes requests to appropriate microservices.
3. JWT token is validated by Auth Service.
4. Business logic is handled by respective services:
   - Customer Service
   - Loan Application Service
   - Loan Processing Service
   - Payment Service
   - Analytics Service
   - Notification Service
5. Responses are returned to frontend and displayed in UI.

---

## Environment Configuration

Backend API configuration is defined in:
src/environments/environment.ts

Example configuration:
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080'
};

---

## Setup and Execution Commands

### Prerequisites
- Node.js (v18 or higher)
- npm
- Angular CLI

### Install Angular CLI
npm install -g @angular/cli

### Clone Repository
git clone <frontend-repo-url>

### Navigate to Project Directory
cd loan-management-system-frontend

### Install Dependencies
npm install

### Run Application (Development Mode)
ng serve

### Run on Custom Port
ng serve --port 4201

### Build for Production
ng build

### Build with Production Configuration
ng build --configuration production

---

## Testing Commands

### Run Unit Tests
ng test

### Run Tests in Headless Mode
ng test --watch=false --browsers=ChromeHeadless

---

## Code Quality and Best Practices

- Standalone Angular components
- Feature-based modular structure
- Strong typing using DTOs and interfaces
- Centralized API communication
- Global error handling
- Role-based route protection
- Clean UI using Angular Material
- Scalable and maintainable architecture

---

## Deployment Flow (Frontend)

1. Run production build using ng build --configuration production.
2. Generated files are available in dist/ directory.
3. Deploy dist/ contents to web server (Nginx, Apache, or cloud hosting).
4. Configure backend API base URL for production environment.

---

