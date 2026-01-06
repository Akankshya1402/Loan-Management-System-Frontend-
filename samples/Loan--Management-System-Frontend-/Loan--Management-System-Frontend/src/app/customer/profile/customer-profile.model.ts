export interface CustomerProfile {
  customerId: string;
  fullName: string;
  email: string;
  mobile: string;
  monthlyIncome: number;
  creditScore: number;
  accountStatus: string;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
}
