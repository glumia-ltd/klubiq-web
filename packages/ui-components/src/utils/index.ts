export const getLocaleFormat = (value: any, formatType: 'currency' | 'percent' | 'number' | string, decimals?: number) => {
	if (!value && value !== 0) return '';
	const num = parseFloat(value);
	if (isNaN(num)) return '';

	switch (formatType) {
		case 'currency':
			return new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: decimals || 2,
				maximumFractionDigits: decimals || 2,
			}).format(num);
		case 'percent':
			return new Intl.NumberFormat('en-US', {
				style: 'percent',
				minimumFractionDigits: decimals || 2,
				maximumFractionDigits: decimals || 2,
			}).format(num / 100);
		case 'number':
			return new Intl.NumberFormat('en-US', {
				minimumFractionDigits: decimals || 0,
				maximumFractionDigits: decimals || 2,
			}).format(num);
		default:
			return num;
	}
}; 