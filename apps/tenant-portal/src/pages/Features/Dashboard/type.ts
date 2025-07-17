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
	amenities: string[];
};

export type NotificationType = {
	type: string;
	title: string;
	message: string;
	data?: Record<string, any>;
	actionLink: string;
	actionText: string;
	createdAt: string;
};