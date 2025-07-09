export type LeaseInsights = {
	leaseId: string;
	propertyName: string;
	unitNumber: string;
	propertyAddress: string;
	rentAmount: number;
	paymentFrequency: string;
	nextDueDate: string;
	daysRemaining: number;
	onTimeRentPaymentPercentage: number;
	upcomingPaymentReminder: any;
	overduePaymentReminder: any;
	isOverdue: boolean;
	missedPayments: number;
	missedPaymentsAmount: number;
	rentDueInDays: number;
	totalLateFees: number;
};
