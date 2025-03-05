import { getData } from '../../src/services/indexedDb';
import { get } from 'lodash';
import { consoleLog } from './debug-logger';

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

export const getCurrencySymbol = (orgSettings: Record<string, unknown>) => {
	let currencySymbol = '';
	if (orgSettings) {
		return get(orgSettings, 'currencySymbol', '');
	} else {
		consoleLog('No orgSettings found -vvv');
		getData('org-settings', 'client-config').then((data) => {
			currencySymbol = get(data, 'orgSettings.currencySymbol', '');
			return currencySymbol;
		});
	}
};

const getInfoFromUserSettings = (orgSettings: Record<string, unknown>) => {
	let currencyCode = '';
	let countryCode = '';
	let lang = '';
	if (!orgSettings) {
		consoleLog('No orgSettings found');
		getData('org-settings', 'client-config').then((data) => {
			currencyCode = get(data, 'orgSettings.currency', '') as string;
			countryCode = get(data, 'orgSettings.countryCode', '') as string;
			lang = get(data, 'orgSettings.language', '') as string;
		});
	} else {
		currencyCode = get(orgSettings, 'currency', '') as string;
		countryCode = get(orgSettings, 'countryCode', '') as string;
		lang = get(orgSettings, 'language', '') as string;
	}
	if (!currencyCode || !countryCode || !lang) {
		currencyCode = '';
		countryCode = '';
		lang = '';
	}

	return { currencyCode, countryCode, lang };
};

export const getLocaleFormat = (
	orgSettings: Record<string, unknown>,
	numberVal: number,
	style: 'currency' | 'percent' | 'unit' | 'decimal',
) => {
	const { countryCode, currencyCode, lang } =
		getInfoFromUserSettings(orgSettings);
	if (lang && countryCode && currencyCode) {
		return new Intl.NumberFormat(`${lang}-${countryCode}`, {
  			style: `${style}`,
  			currency: `${currencyCode}`,
  			currencyDisplay: 'symbol',
  		}).format(numberVal);
	}
	return '';
};

export const getLocaleDateFormat = (
	orgSettings: Record<string, unknown>,
	date: string,
) => {
	const { countryCode, lang } = getInfoFromUserSettings(orgSettings);
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
