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
		currencyCode = '';
		countryCode = '';
		lang = '';
	}

	return { currencyCode, countryCode, lang };
};

export const getLocaleFormat = (
	user: any,
	numberVal: number,
	style: 'currency' | 'percent' | 'unit' | 'decimal',
) => {
	const { countryCode, currencyCode, lang } = getInfoFromUserSettings(user);
	if (lang && countryCode && currencyCode) {
		const localCurrencyVal = new Intl.NumberFormat(`${lang}-${countryCode}`, {
			style: `${style}`,
			currency: `${currencyCode}`,
			currencyDisplay: 'symbol',
		}).format(numberVal);
		return localCurrencyVal;
	}
	return '';
};

export const getLocaleDateFormat = (user: unknown, date: string) => {
	const { countryCode, lang } = getInfoFromUserSettings(user);
	if (lang && countryCode) {
		const newDate = new Date(date) || new Date();

		const locale = `${lang}-${countryCode}`;

		return new Intl.DateTimeFormat(locale).format(newDate);
	}
	return '';
};
export const stringToColor = (string: string, hash: number = 5) => {
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
};
export const stringAvatar = (word1: string, word2: string) => {
	return {
		sx: {
			bgcolor: stringToColor(`${word1} ${word2}`),
			width: '40px',
			height: '40px',
			marginRight: '1rem',
			borderRadius: '90px',
		},
		children: `${word1[0]}${word2[0]}`,
	};
};
