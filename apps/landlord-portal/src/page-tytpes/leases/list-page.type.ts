import { UnitWithProperty } from "../properties/detail-page.types";


export const statusColors: Record<string, string> = {
	Active: 'success',
	Expiring: 'warning',
	'Over Due': 'error',
	"Occupied":"info",
	'N/A': 'default',
	Expired:"error",
	Inactive:"info",
	Terminated:"error",
};

export type Lease = {
	id: string;
	leaseStart: string;
	leaseEnd: string;
	rentAmount: string;
	unit: UnitWithProperty;
	propertyName: string;
	propertyAddress: string;
	paymentFrequency: string;
	lastPaymentDate: string | null;
	nextDueDate: string;
	lateFeeAmount: string | null;
	securityDeposit: string;
  };
