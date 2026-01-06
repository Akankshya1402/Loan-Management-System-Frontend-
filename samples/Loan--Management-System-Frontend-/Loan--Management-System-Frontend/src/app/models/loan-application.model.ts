// ✅ Loan APPLICATION (pre-approval)
export interface LoanApplication {
  _id: string;          // Mongo ObjectId
  customerId: string;
  loanType: string;
  loanAmount: number;
  tenureMonths: number;
  status: string;       // SUBMITTED / APPROVED / REJECTED
  createdAt: string;
}
