export interface EmiSchedule {
  id: string;
  loanId: string;
  emiNumber: number;
  emiAmount: number;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
}
