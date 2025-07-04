import { get } from 'lodash';

import dayjs from 'dayjs';

export const formatDate = (dateString: string, format = 'MMMM D, YYYY') => {
	if (!dateString) {
		return '';
	}
	return dayjs(dateString).format(format);
};

const getInfoFromUserSettings = (
	userLocationPreference: Record<string, unknown>,
) => {
	let currencyCode = '';
	let countryCode = '';
	let lang = '';

	currencyCode = get(userLocationPreference, 'currency', 'NGN') as string;
	countryCode = get(userLocationPreference, 'countryCode', 'NG') as string;
	lang = get(userLocationPreference, 'language', 'en') as string;

	return { currencyCode, countryCode, lang };
};

export const getLocaleFormat = (
	numberVal: number,
	style: 'currency' | 'percent' | 'unit' | 'decimal',
	decimals: number = 2,
	userLocationPreference: Record<string, unknown> = {},

) => {
	const { countryCode, currencyCode, lang } = getInfoFromUserSettings(
		userLocationPreference,
	);
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
	userLocationPreference: Record<string, unknown>,
	date: string,
	options?: {
		dateStyle?: 'full' | 'short' | 'long' | 'medium';
		timeStyle?: 'full' | 'short' | 'long' | 'medium';
		hour12?: boolean;
	},
) => {
	const { countryCode, lang } = getInfoFromUserSettings(userLocationPreference);
	if (lang && countryCode) {
		const newDate = dayjs(date).toDate() || dayjs().toDate();

		const locale = `${lang}-${countryCode}`;

		return new Intl.DateTimeFormat(locale, options).format(newDate);
	}
	return '';
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
	style: 'percent' | 'unit' | 'decimal',
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
// function getCurrentLine(): number | null {
// 	const err = new Error();
// 	if (!err.stack) return null;
// 	const stackLines = err.stack.split('\n');
// 	// Caller is typically at index 2 in the stack trace
// 	const callerLine = stackLines[2] || '';
// 	const match = callerLine.match(/:(\d+):\d+\)?$/);
// 	return match?.[1] ? parseInt(match[1], 10) : null;
//   }
