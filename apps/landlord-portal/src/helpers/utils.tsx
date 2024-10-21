import { getData } from '../../src/services/indexedDb';
import { get } from 'lodash';

export const MEASUREMENTS: any[] = [
	{
		unit: 'SqM',
		symbol: <span>m&sup2;</span>,
	},
	{
		unit: 'SqCm',
		symbol: <span>cm&sup2;</span>,
	},
	{
		unit: 'SqFt',
		symbol: <span>ft&sup2;</span>,
	},
	{
		unit: 'SqIn',
		symbol: <span>in&sup2;</span>,
	},
];

export const getCurrencySymbol = (user: any) => {
	if (!user.orgSettings) {
		const orgSettings = getData('org-settings', 'client-config');
		const currencySymbol = get(orgSettings, 'currencySymbol', '');
		return currencySymbol;
	}
	const currencySymbol = get(user, 'orgSettings.currencySymbol', '');
	return currencySymbol;
};
