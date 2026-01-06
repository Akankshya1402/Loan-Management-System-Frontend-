export interface Loan {
  loanId: string;
  loanType: string;      // ✅ ADD THIS
  applicationId: string;
  customerId: string;

  principal: number;
  interestRate: number;
  tenureMonths: number;

  emiAmount: number;
  outstandingAmount: number;

  status: string;
  disbursedAt: string;
  closedAt?: string;
}
