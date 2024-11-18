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

const getInfoFromUserSettings = (user: any) => {
	let currencyCode = '';
	let countryCode = '';
	let lang = '';
	if (!user.orgSettings) {
		const orgSettings = getData('org-settings', 'client-config');
		currencyCode = get(orgSettings, 'currency', '');
		countryCode = get(orgSettings, 'countryCode', '');
		lang = get(orgSettings, 'language', '');
	} else {
		currencyCode = get(user, 'orgSettings.currency', '');
		countryCode = get(user, 'orgSettings.countryCode', '');
		lang = get(user, 'orgSettings.language', '');
	}
	if (!currencyCode || !countryCode || !lang) {
		currencyCode = 'NGN';
		countryCode = 'NG';
		lang = 'en';
	}

	return { currencyCode, countryCode, lang };
};

export const getLocaleFormat = (
	user: any,
	numberVal: number,
	style: 'currency' | 'percent' | 'unit' | 'decimal',
) => {
	const { countryCode, currencyCode, lang } = getInfoFromUserSettings(user);

	const localCurrencyVal = new Intl.NumberFormat(`${lang}-${countryCode}`, {
		style: `${style}`,
		currency: `${currencyCode}`,
		currencyDisplay: 'symbol',
	}).format(numberVal);
	return localCurrencyVal;
};

export const getLocaleDateFormat = (user: any, date: string) => {
	const { countryCode, lang } = getInfoFromUserSettings(user);

	const newDate = new Date(date) || new Date();

	const locale = `${lang}-${countryCode}`;

	return new Intl.DateTimeFormat(locale).format(newDate);
};
