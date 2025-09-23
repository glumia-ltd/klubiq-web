export type PaymentMethod = 'CARD' | 'ACCOUNT_TRANSFER' | 'DIRECT_DEBIT';
export interface SavedPaymentMethod {
    id: string;
    userId: string;
    provider: string;
    token: string;
    last4: string;
    cardType: string;
    expiryMonth: string;
    expiryYear: string;
    accountNumber: string;
    accountName: string;
    bankName: string;
    bankCode: string;
    accountType: string;
    type: string;
    country: string;
    currency: string;
    isPrimary: boolean;
  }
  
  // You might also want to create more specific types for different payment methods
  export interface CardPaymentMethod extends Pick<SavedPaymentMethod, 'id' | 'userId' | 'provider' | 'token' | 'last4' | 'cardType' | 'expiryMonth' | 'expiryYear' | 'type' | 'country' | 'currency' | 'isPrimary'> {
    type: 'CARD';
  }
  
  export interface BankPaymentMethod extends Pick<SavedPaymentMethod, 'id' | 'userId' | 'provider' | 'token' | 'accountNumber' | 'accountName' | 'bankName' | 'bankCode' | 'accountType' | 'type' | 'country' | 'currency' | 'isPrimary'> {
    type: 'BANK';
  }
  
  // Union type for all payment methods
  export type PaymentMethodType = CardPaymentMethod | BankPaymentMethod;

  export type UpdateTransactionStatus = {
    ledgerId: string;
    txnStatus: 'success' | 'failed';
    metadata: Record<string, any>
  }

  export type LeaseConfigType = {
    currency: string;
    currencySymbol: string;
  }

  export type UpcomingPayment = {
    leaseId: string;
    amount: number;
    dueDate: string;
    status: string;
    invoiceId: string;
    daysToDue: number;
    lateFeeAmount: number;
    securityDeposit: number;
    leaseDaysRemaining: number;
    propertyName: string;
    unitNumber: string;
    leaseConfig: LeaseConfigType;
  }