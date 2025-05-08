import { getData } from '../../src/services/indexedDb';
import { get } from 'lodash';
import { consoleLog } from './debug-logger';
import dayjs from 'dayjs';


 
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
		consoleLog('No orgSettings found for currency symbol');
		getData('org-settings', 'client-config').then((data) => {
			currencySymbol = get(data, 'orgSettings.currencySymbol', '₦');
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
			currencyCode = get(data, 'orgSettings.currency', 'NGN') as string;
			countryCode = get(data, 'orgSettings.countryCode', 'NG') as string;
			lang = get(data, 'orgSettings.language', 'en') as string;
		});
	} else {
		currencyCode = get(orgSettings, 'currency', 'NGN') as string;
		countryCode = get(orgSettings, 'countryCode', 'NG') as string;
		lang = get(orgSettings, 'language', 'en') as string;
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
	decimals: number = 2
) => {
	const { countryCode, currencyCode, lang } =
		getInfoFromUserSettings(orgSettings);
	if (lang && countryCode && currencyCode) {
		return new Intl.NumberFormat(`${lang}-${countryCode}`, {
  			style: `${style}`,
  			currency: `${currencyCode}`,
  			currencyDisplay: 'symbol',
  			minimumFractionDigits: style === 'percent' ? 0 : decimals,
  			maximumFractionDigits: style === 'percent' ? 0 : decimals,
  		}).format(numberVal);
	}
	return '';
};

export const enum DateStyle {
	FULL = 'full',
	SHORT = 'short',
	LONG = 'long',
	MEDIUM = 'medium',
}

export const getLocaleDateFormat = (
	orgSettings: Record<string, unknown>,
	date: string,
	options?: {
		dateStyle?: 'full' | 'short' | 'long' | 'medium',
		timeStyle?: 'full' | 'short' | 'long' | 'medium',
		hour12?: boolean,
	},
) => {
	const { countryCode, lang } = getInfoFromUserSettings(orgSettings);
	if (lang && countryCode) {
		const newDate = dayjs(date).toDate() || dayjs().toDate();

		const locale = `${lang}-${countryCode}`;

		return new Intl.DateTimeFormat(locale, options).format(newDate);
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

 // Parse formatted values back to numbers
 export const parseCurrency = (value: string): number => {
    return Number(value.replace(/[^0-9.-]+/g, ''));
  };

  export const parsePercentage = (value: string): number => {
    return Number(value.replace(/[^0-9.-]+/g, ''));
  };
  export const getLocaleFormat1 = (
    numberVal: number,
    style:  'percent' | 'unit' | 'decimal',
    decimals: number = 2,
  ) => {
    const locale = navigator.language;
    if (locale) {
      return new Intl.NumberFormat(locale, {
          style: `${style}`,
          minimumFractionDigits: style === 'percent' ? 0 : decimals,
          maximumFractionDigits: style === 'percent' ? 0 : decimals,
        }).format(style === 'percent' ? numberVal / 100 : numberVal);
    }
    return '';
  };

  /**
 * Returns the current line number by inspecting the Error stack trace.
 */
function getCurrentLine(): number | null {
	const err = new Error();
	if (!err.stack) return null;
	const stackLines = err.stack.split('\n');
	// Caller is typically at index 2 in the stack trace
	const callerLine = stackLines[2] || '';
	const match = callerLine.match(/:(\d+):\d+\)?$/);
	return match?.[1] ? parseInt(match[1], 10) : null;
  }
  