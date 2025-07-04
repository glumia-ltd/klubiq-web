export type LeaseInsights = {
	leaseId: string;
	propertyName: string;
	unitNumber: string;
	propertyAddress: string;
	rentAmount: number;
	paymentFrequency: string;
	nextDueDate: Date;
	daysRemaining: number;
	onTimeRentPaymentPercentage: number;
	upcomingPayment: any;
};
