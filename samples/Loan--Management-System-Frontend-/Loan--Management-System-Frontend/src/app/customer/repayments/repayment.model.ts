export interface EmiSchedule {
  loanId: string;
  loanType: string;
  loanAmount: number;
  tenureMonths: number;
  emiAmount: number;
  nextDueDate: string;
  status: 'ACTIVE' | 'CLOSED';
}
