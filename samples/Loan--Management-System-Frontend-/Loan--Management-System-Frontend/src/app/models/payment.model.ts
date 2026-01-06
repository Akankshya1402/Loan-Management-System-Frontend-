export interface Payment {
  paymentId: string;
  loanId: string;
  emiNumber: number;
  amount: number;
  status: string;
  transactionRef: string;
  createdAt: string;
}
