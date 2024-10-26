const formatNumber = (
	value: number | undefined,
	options: Intl.NumberFormatOptions,
): string => {
	if (value === undefined || value === null) return '';
	return new Intl.NumberFormat('vi-VN', options).format(value);
};

export const formatPrice = (value: number | undefined): string => {
	return formatNumber(value, { style: 'currency', currency: 'VND' });
};

export const formatPriceWithoutSymbol = (value: number | undefined): string => {
	return formatNumber(value, { style: 'decimal' });
};

export const formatPercentage = (value: number | undefined): string => {
	if (value === undefined || value === null) return '';
	return `${value.toFixed(0)}%`; // Đảm bảo có một chữ số thập phân
};
