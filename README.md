# Loan Management System – Frontend (Angular)

This repository contains the frontend application for a microservices-based Loan Management System (LMS). The application is developed using Angular and serves as the user interaction layer for customers, loan officers, and administrators. It enables secure, role-based access to loan operations such as loan application, approval or rejection, EMI payments, notifications, and analytics by integrating with backend services through an API Gateway.

## Purpose of the Project
The main purpose of this frontend application is to provide a clean, scalable, and user-friendly interface for managing the complete loan lifecycle. It abstracts complex backend workflows and presents them through intuitive dashboards while ensuring security, modularity, and maintainability.

## Key Features
- JWT-based authentication and authorization
- Role-based access control (Customer, Loan Officer, Admin)
- Loan application submission and tracking
- Loan approval and rejection workflows
- EMI schedule visualization and payment tracking
- Payment history and transaction references
- Analytics and reporting dashboards
- Notification alerts for loan and payment events

## User Roles and Functional Flow
Customer users can register, log in, apply for loans, track loan status, view approved loans, pay EMIs, and view payment history. Loan officers can view pending loan applications, review customer and loan details, and approve or reject loans. Admin users can monitor overall system activity, view analytics dashboards, and track loan and payment statistics. All user actions are securely routed through the backend API Gateway.

## Technology Stack
Frontend: Angular (Standalone Components), TypeScript, Angular Material, SCSS, RxJS  
Integration: REST APIs, JWT Authentication, API Gateway  
Tooling: Node.js, npm, Angular CLI

## Application Architecture
The frontend follows a feature-based modular architecture to ensure scalability and separation of concerns.

src/
- core: authentication services, guards, HTTP interceptors, shared API services  
- features: auth, customer, loan-officer, admin, payments modules  
- shared: reusable UI components, models, and interfaces  
- assets: static resources  
- environments: environment-specific configuration  
- app.routes.ts: centralized route configuration  

## Backend Integration
The frontend communicates with backend microservices via an API Gateway. These services include Authentication Service, Customer Service, Loan Application Service, Loan Processing Service, Payment Service, Analytics Service, and Notification Service. All API communication is handled using Angular services with centralized error handling and JWT token injection through HTTP interceptors.

## Environment Configuration
Backend API endpoints are configured in src/environments/environment.ts.

Example:
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080'
};

## Setup and Execution
Prerequisites: Node.js (v18+), npm, Angular CLI

Steps to run the project:
1. Clone the repository  
   git clone <frontend-repo-url>
2. Navigate to the project directory  
   cd loan-management-system-frontend
3. Install dependencies  
   npm install
4. Start the development server  
   ng serve

The application will be accessible at http://localhost:4200

## Testing
Unit and component testing is implemented using Jasmine and Karma. Service-level tests use mocked API responses to ensure isolation.

Run tests using:
ng test

## Development Practices Followed
- Standalone Angular components
- Strong typing using interfaces and DTOs
- Centralized API and error handling
- Role-based routing using guards
- Clean and responsive UI using Angular Material
- Scalable and maintainable folder structure

## License
This project is developed for academic, learning, and portfolio demonstration purposes.
